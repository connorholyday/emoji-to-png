import {
  data,
  emoticons_data,
  variations_data,
  obsoletes_data,
} from './emoji-data';

class emoji {
  constructor() {
    this.img_set = 'apple';
    this.img_sets = {
      apple: {
        path: '/emoji-data/img-apple-64/',
        sheet: '/emoji-data/sheet_apple_64.png',
        sheet_size: 64,
        mask: 1,
      },
      google: {
        path: '/emoji-data/img-google-64/',
        sheet: '/emoji-data/sheet_google_64.png',
        sheet_size: 64,
        mask: 2,
      },
      twitter: {
        path: '/emoji-data/img-twitter-64/',
        sheet: '/emoji-data/sheet_twitter_64.png',
        sheet_size: 64,
        mask: 4,
      },
      emojione: {
        path: '/emoji-data/img-emojione-64/',
        sheet: '/emoji-data/sheet_emojione_64.png',
        sheet_size: 64,
        mask: 8,
      },
      facebook: {
        path: '/emoji-data/img-facebook-64/',
        sheet: '/emoji-data/sheet_facebook_64.png',
        sheet_size: 64,
        mask: 16,
      },
      messenger: {
        path: '/emoji-data/img-messenger-64/',
        sheet: '/emoji-data/sheet_messenger_64.png',
        sheet_size: 64,
        mask: 32,
      },
    };
    this.use_css_imgs = false;
    this.colons_mode = false;
    this.text_mode = false;
    this.include_title = false;
    this.include_text = false;
    this.allow_native = true;
    this.wrap_native = false;
    this.use_sheet = false;
    this.avoid_ms_emoji = true;
    this.allow_caps = false;
    this.img_suffix = '';
    this.inits = {};
    this.map = {};

    // discover the environment settings
    this.init_env();
    this.sheet_size = 52;

    this.data = data;
    this.emoticons_data = emoticons_data;
    this.variations_data = variations_data;
    this.obsoletes_data = obsoletes_data;
  }

  /**
   * @memberof emoji
   * @param {string} str A string potentially containing colon string
   * representations of emoticons (ie. `:smile:`)
   *
   * @returns {string} A new string with all colon string emoticons replaced
   * with the appropriate representation.
   */
  replace_colons(str) {
    var self = this;
    self.init_colons();

    return str.replace(self.rx_colons, function(m) {
      var idx = m.substr(1, m.length - 2);
      if (self.allow_caps) idx = idx.toLowerCase();

      // special case - an emoji with a skintone modified
      if (idx.indexOf('::skin-tone-') > -1) {
        var skin_tone = idx.substr(-1, 1);
        var skin_idx = 'skin-tone-' + skin_tone;
        var skin_val = self.map.colons[skin_idx];

        idx = idx.substr(0, idx.length - 13);

        var val = self.map.colons[idx];
        if (val) {
          return self.replacement(val);
        } else {
          return ':' + idx + ':' + self.replacement(skin_val);
        }
      } else {
        val = self.map.colons[idx];
        return val ? self.replacement(val) : m;
      }
    });
  }

  replacement(idx) {
    const { path } = this.find_image(idx);
    return path;
  }

  find_image(idx) {
    var self = this;

    // set up some initial state
    var out = {
      path: '',
      sheet: '',
      sheet_size: 0,
      px: self.data[idx][4],
      py: self.data[idx][5],
      full_idx: idx,
      is_var: false,
      unified: self.data[idx][0][0],
    };
    var use_mask = self.data[idx][6];

    // this matches `build/build_image.php` `in emoji-data`, so that sheet and images modes always
    // agree about the image to use.
    var try_order = [
      self.img_set,
      'apple',
      'emojione',
      'google',
      'twitter',
      'facebook',
      'messenger',
    ];

    // for each image set, see if we have the image we need. otherwise check for an obsolete in
    // that image set
    for (var j = 0; j < try_order.length; j++) {
      if (use_mask & self.img_sets[try_order[j]].mask) {
        out.path =
          self.img_sets[try_order[j]].path +
          out.full_idx +
          '.png' +
          self.img_suffix;
        // if we're not changing glyph, use our base set for sheets - it has every glyph
        out.sheet = self.img_sets[self.img_set].sheet;
        out.sheet_size = self.img_sets[self.img_set].sheet_size;
        return out;
      }
      if (self.obsoletes_data[out.full_idx]) {
        var ob_data = self.obsoletes_data[out.full_idx];

        if (ob_data[3] & self.img_sets[try_order[j]].mask) {
          out.path =
            self.img_sets[try_order[j]].path +
            ob_data[0] +
            '.png' +
            self.img_suffix;
          out.sheet = self.img_sets[try_order[j]].sheet;
          out.sheet_size = self.img_sets[try_order[j]].sheet_size;
          out.px = ob_data[1];
          out.py = ob_data[2];
          return out;
        }
      }
    }

    return out;
  }

  init_colons() {
    var self = this;
    if (self.inits.colons) return;
    self.inits.colons = 1;
    self.rx_colons = new RegExp(':[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?', 'g');
    self.map.colons = {};
    for (var i in self.data) {
      for (var j = 0; j < self.data[i][3].length; j++) {
        self.map.colons[self.data[i][3][j]] = i;
      }
    }
  }

  init_env() {
    var self = this;
    if (self.inits.env) return;
    self.inits.env = 1;
    self.replace_mode = 'img';
    self.supports_css = false;
    if (typeof navigator !== 'undefined') {
      var ua = navigator.userAgent;
      if (typeof window !== 'undefined' && window.getComputedStyle) {
        try {
          var st = window.getComputedStyle(document.body);
          if (st['background-size'] || st['backgroundSize']) {
            self.supports_css = true;
          }
        } catch (e) {
          // Swallow an exception caused by hidden iFrames on Firefox
          // https://github.com/iamcal/js-emoji/issues/73
          if (ua.match(/Firefox/i)) {
            self.supports_css = true;
          }
        }
      }
      if (ua.match(/(iPhone|iPod|iPad|iPhone\s+Simulator)/i)) {
        if (ua.match(/OS\s+[12345]/i)) {
          self.replace_mode = 'softbank';
          return;
        }
        if (ua.match(/OS\s+[6789]/i)) {
          self.replace_mode = 'unified';
          return;
        }
      }
      if (ua.match(/Mac OS X 10[._ ](?:[789]|1\d)/i)) {
        self.replace_mode = 'unified';
        return;
      }
      if (!self.avoid_ms_emoji) {
        if (
          ua.match(/Windows NT 6.[1-9]/i) ||
          ua.match(/Windows NT 10.[0-9]/i)
        ) {
          if (!ua.match(/Chrome/i) && !ua.match(/MSIE 8/i)) {
            self.replace_mode = 'unified';
            return;
          }
        }
      }
    }

    // Need a better way to detect android devices that actually
    // support emoji.
    if (false && ua.match(/Android/i)) {
      self.replace_mode = 'google';
      return;
    }
    if (self.supports_css) {
      self.replace_mode = 'css';
    }
    // nothing fancy detected - use images
  }
}

export default emoji;
