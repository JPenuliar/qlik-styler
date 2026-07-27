# 🎨 Qlik Styler - Future Prompting Blueprint

A zero-reload, decoupled, modular Vanilla JS + jQuery layout styling engine built for Qlik Sense SaaS. It completely bypasses Hypercubes to manipulate the DOM dynamically using custom property arrays.

---

## 🏗️ Architecture Blueprint (Core Logic Only)

### 1. Color Picker Handler (`properties.js`)
Qlik Cloud returns color picker inputs as nested objects `{ color: '#hex' }` even when declared as flat strings. Always run values through this extraction utility before injecting them into CSS templates:

```javascript
function resolveHexColor(colorInput) {
    if (!colorInput || colorInput === "none") return "transparent";
    if (typeof colorInput === 'object') return colorInput.color || colorInput.hex || "transparent";
    return colorInput;
}
```

### 2. Runtime Scrollbar & Height Calculation (`qlik-styler.js`)
Qlik's grid container strips vertical height tracking context. To force browser overflow scrollbars on code previews, you must programmatically read the container heights at runtime and inject explicit pixel limit properties:

```javascript
var parentObjectContent = \$element.closest('.qv-object-content');
var totalAvailableHeight = parentObjectContent.length > 0 ? parentObjectContent.height() : \$element.height();
if (!totalAvailableHeight || totalAvailableHeight < 100) totalAvailableHeight = 300;

var codeBoxMaxHeight = totalAvailableHeight - 90; // Excludes header labels padding
\$preCodeTag.css({ 'max-height': codeBoxMaxHeight + 'px', 'overflow-y': 'auto' });
```

---

## 🚨 Non-Negotiable Architecture Constraints

* **Array Property Nesting Bug**: Inside custom array fields (`type: "array"`), the custom color picker must be defined strictly as a primitive `type: "string"`. Using `type: "object"` will cause Qlik to drop the control box entirely.
* **Token Substitution Rule**: Standardize template injections inside `presets.js` by tracking color nodes using the string literal token `##COLOR##`. The dropdown selection execution loop automatically overrides this placeholder string with the resolved HEX output text.
* **Namespace Quarantine**: Always prefix targeted table modifications using the explicit virtual layout class namespace `.sn-table`. This isolates styling rules to the virtual straight table DOM wrapper layout and preserves system-level object safety.

---

## 🔮 Future Prompting Recipes (Copy & Paste to AI)

### Recipe 1: Inject a New Pre-built Dropdown Rule
> "Add a new preset rule block to `presets.js` and map its identifier to `properties.js`. The targeted element is `[SELECTOR_HERE] { css-property: ##COLOR## !important; }`. Follow the commercial label taxonomy schema string format: `Chart Type > Affected Element > Action Result`."

### Recipe 2: Debugging Layout/Property Errors
> "Review `properties.js` and `qlik-styler.js`. Ensure that color pickers located inside multi-row array structures are configured as flat string primitives. Verify that the runtime block execution engine calculates the exact pixel bounds of `.qv-object-content` to enable scroll tracking rules."
