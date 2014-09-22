jquery.ifField
==============

Usage
----------
Simple and clear example:
```html
<form>
    <input name="city" value="Moscow" type="text">
    <div id="moscow-metro-stations"></div>
    <div id="samara-metro-stations"></div>
</form>
<script>
    $('input[name="city"]').ifField(function ($field) {
        return $field.val() == "Moscow";
    }, true).then(function ($field) {
        console.log("The city is Moscow!");
        $('#moscow-metro-stations').show();
    }).otherwise(function ($field) {
        console.log("The city is not Moscow!");
        $('#moscow-metro-stations').hide();
    }).elseif(function ($field) {
        return $field.val() == "Samara";
    }, true).then(function ($field) {
        console.log("The city is Samara!");
        $('#samara-metro-stations').show(); // You can load and show additional fields via AJAX, for example
    }).otherwise(function ($field) {
        console.log("The city is not Samara!");
        $('#samara-metro-stations').hide();
    });
</script>
```

```
.ifField(comparisonCallback, immediateCheck);
```
`comparisonCallback` is called every time that field value changes and right now if `immediateCheck` is `true`, however it defaults to `false`.

```
.then(callback);
```
`callback` is called when `comparisonCallback` returned `true`.

```
.otherwise(callback);
```
`callback` is called when `comparisonCallback` returned `false`.


Requirements
------------
Modern browsers, IE >= 9.
