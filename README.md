jquery.ifField
==============

Usage
----------
```html
<form>
    <input name="city" value="Moscow" type="text">
</form>
<script>
    $('input[name="city"]').ifField(function ($field) {
        return $field.val() == "Moscow";
    }, true).then(function ($field) {
        console.log("The city is Moscow!");
    }).otherwise(function ($field) {
        console.log("The city is not Moscow!");
    }).elseif(function ($field) {
        return $field.val() == "Samara";
    }, true).then(function ($field) {
        console.log("The city is Samara!");
    }).otherwise(function ($field) {
        console.log("The city is not Samara!");
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
