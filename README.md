# parallax-background.js

jQuery Parallax Background Plugin by Eren Süleymanoğlu


### Installation

Download and include `parallax-background.min.js` in your document after including jQuery.

```html
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="/path/to/parallax-background.min.js"></script>
```


### Usage

To easily add a parallax effect to an element, add following lines between your `<script>` tags:

```html
<script>
    (function ($) {
        $('.your-class').parallaxBackground();
    })(jQuery);
</script>
```


### Options

Options can be passed in via data attributes of JavaScript. For data attributes, append the option name to `data-`, as in `data-parallax-bg-image="""`.

Note that when specifying these options as html data-attributes, you should convert `"camelCased"` variable names into `"dash-separated"` lower-case names.

(e.g. `parallaxSpeed` would be `data-parallax-speed=""`).


<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">Name</th>
            <th style="width: 100px;">Type</th>
            <th style="width: 100px;">Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>parallaxBgImage</td>
            <td>path</td>
            <td>null</td>
            <td>You must provide a path to the image you wish to apply to the parallax effect.</td>
        </tr>
        <tr>
            <td>parallaxBgPosition</td>
            <td>string</td>
            <td>center center</td>
            <td>
                You can provide css background-size property. The parallax image will be positioned as close to these values as possible while still covering the target element.<br><br>
                Available options: left top, left center, left bottom, right top, right center, right bottom, center top, center center, center bottom
            </td>
        </tr>
        <tr>
            <td>parallaxBgRepeat</td>
            <td>string</td>
            <td>no-repeat</td>
            <td>
                You can provide css background-repeat property. The parallax image will be repeated as you provided.<br><br>
                Available options: repeat, repeat-x, repeat-y, no-repeat
            </td>
        </tr>
        <tr>
            <td>parallaxBgSize</td>
            <td>string</td>
            <td>cover</td>
            <td>
                You can provide css background-size property. The parallax image will be sized as you provided.<br><br>
                Available options: auto, contain, cover
            </td>
        </tr>
        <tr>
            <td>parallaxSpeed</td>
            <td>float</td>
            <td>0.5</td>
            <td>
                The speed at which the parallax effect runs. 0 means the image will appear fixed in place, and 1 the image will flow at the same speed as the page content.<br><br>
                Available options: float value between 0 and 1
            </td>
        </tr>
        <tr>
            <td>parallaxDirection</td>
            <td>string</td>
            <td>up</td>
            <td>
                You can provide direction for your parallax effect.<br><br>
                Available options: up, down, left, right
            </td>
        </tr>
    </tbody>
</table>


### License

parallax-background.js is proudly sponsored by [VigitalArt](https://graphicriver.net/user/vigitalart) and released under [MIT License](https://github.com/erensuleymanoglu/parallax-background/blob/master/LICENSE.txt)