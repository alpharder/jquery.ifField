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
