define([
    './presets'
], function(PRESETS) {
    'use strict';

    function resolveHexColor(colorInput) {
        if (!colorInput || colorInput === "none") {
            return "transparent";
        }
        if (typeof colorInput === 'object') {
            return colorInput.color || colorInput.hex || "transparent";
        }
        return colorInput;
    }

    return {
        type: "items",
        component: "accordion",
        items: {
            settings: {
                uses: "settings",
                items: {
                    customStylesSection: {
                        type: "items",
                        label: "📋 Advanced UI Style Manager",
                        items: {
                            myStyleList: {
                                type: "array",
                                ref: "prop.customCssList",
                                label: "Active CSS Override Matrix",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                allowMove: true,
                                addTranslation: "Add Custom Style Rule",
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Rule Description / Name",
                                        defaultValue: "New Layout Rule"
                                    },
                                    templateSelector: {
                                        type: "string",
                                        component: "dropdown",
                                        label: "Quick-Load Preset Template",
                                        ref: "selectedPreset",
                                        options: [
                                            { value: "custom", label: "✏️ Custom > Layout > Code from scratch..." },
                                            { value: "totalsNegativeHighlight", label: "📊 Straight Table > Totals > Highlight Negatives" },
                                            { value: "totalsPositiveStandard", label: "📊 Straight Table > Totals > Format Positives" },
                                            { value: "totalsColIndex", label: "📊 Straight Table > Totals > Style by Column Index" },
                                            { value: "totalsRightAlign", label: "📊 Straight Table > Totals > Style by Right Alignment" },
                                            { value: "totalsBgHighlight", label: "📊 Straight Table > Totals > Cell Background Accent" },
                                            { value: "totalsDoubleTop", label: "📊 Straight Table > Totals > Double Border Line (Top)" },
                                            { value: "totalsDoubleBottom", label: "📊 Straight Table > Totals > Double Border Line (Bottom)" },
                                            { value: "headerCellBorders", label: "📋 Straight Table > Headers > Separation Border & Background" },
                                            { value: "headerTextWeight", label: "📋 Straight Table > Headers > High-Weight Typography Accent" },
                                            { value: "headerColHighlight", label: "📋 Straight Table > Headers > Highlight Column Index 1" },
                                            { value: "firstColumnAccent", label: "📊 Straight Table > Columns > Highlight First Dimension Row" },
                                            { value: "hideGlobalSelectionsToggle", label: "⚡ Global > Selections Toolbar > Hide Toggle Button" }
                                        ],
                                        defaultValue: "custom",
                                        change: function(itemData) {
                                            var choice = itemData.selectedPreset;
                                            if (choice && choice !== "custom" && PRESETS[choice]) {
                                                var rawTemplate = PRESETS[choice];
                                                
                                                var hexColor = resolveHexColor(itemData.chosenColor);
                                                if (hexColor && hexColor !== "transparent") {
                                                    rawTemplate = rawTemplate.replace(/##COLOR##/g, hexColor);
                                                    rawTemplate = rawTemplate.replace(/#f5f5f5/g, hexColor);
                                                }
                                                
                                                itemData.cssCode = rawTemplate;
                                                
                                                if (itemData.label === "New Layout Rule") {
                                                    var cleanLabel = this.options.find(function(opt) { return opt.value === choice; }).label;
                                                    itemData.label = cleanLabel.substring(2).trim();
                                                }
                                            }
                                        }
                                    },
                                    customColorPicker: {
                                        type: "string",
                                        component: "color-picker",
                                        ref: "chosenColor",
                                        label: "Custom Accent Color Override",
                                        defaultValue: "none",
                                        change: function(itemData) {
                                            var choice = itemData.selectedPreset;
                                            var hexColor = resolveHexColor(itemData.chosenColor);
                                            
                                            if (choice && choice !== "custom" && PRESETS[choice] && hexColor && hexColor !== "transparent") {
                                                var updatedCode = PRESETS[choice].replace(/##COLOR##/g, hexColor);
                                                updatedCode = updatedCode.replace(/#f5f5f5/g, hexColor);
                                                
                                                itemData.cssCode = updatedCode;
                                            }
                                        }
                                    },
                                    cssBlock: {
                                        type: "string",
                                        component: "textarea",
                                        rows: 5,
                                        ref: "cssCode",
                                        label: "Active CSS Code Block",
                                        defaultValue: ""
                                    }
                                }
                            }
                        }
                    },
                    displayOptions: {
                        type: "items",
                        label: "Styler Visibility",
                        items: {
                            hideExtensionInAnalysis: {
                                type: "boolean",
                                component: "switch",
                                label: "Hide object in View mode",
                                ref: "prop.hideExtension",
                                options: [{ value: true, label: "On" }, { value: false, label: "Off" }],
                                defaultValue: true
                            }
                        }
                    }
                }
            }
        }
    };
});
