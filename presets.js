define([], function() {
    'use strict';

    return {
        // --- 📊 SAAS STRAIGHT TABLE PRESETS (sn-table) ---
        
        totalsNegativeHighlight: "/* Target negative values inside the Totals Row */\n.sn-table-totals-row div[title^=\"-\"] span,\n.sn-table-totals-row div[title^=\"-\"] div,\n.sn-table-totals-row div[title^=\"-\"] .sn-table-cell-text {\n    color: ##COLOR## !important;\n}",

        totalsPositiveStandard: "/* Target positive values inside the Totals Row */\n.sn-table-totals-row div:not([title^=\"-\"]) span,\n.sn-table-totals-row div:not([title^=\"-\"]) div,\n.sn-table-totals-row div:not([title^=\"-\"]) .sn-table-cell-text {\n    color: ##COLOR## !important;\n}",

        totalsColIndex: "/* Format specific summary cell text via column index location and Color Picker */\n.sn-table-totals-row [data-col=\"1\"] .sn-table-cell-text {\n  color: ##COLOR## !important;\n}",
        
        totalsRightAlign: "/* Format right-aligned metric values inside the totals row container via Color Picker */\n.sn-table-totals-row [style*=\"justify-content: right\"] .sn-table-cell-text {\n  color: ##COLOR## !important;\n}",
        
        totalsBgHighlight: "/* Apply background highlight fill to the summary cell container via Color Picker */\n.sn-table-totals-row [data-col=\"1\"] {\n  background-color: ##COLOR## !important;\n}",

        firstColumnAccent: "/* Apply prominent vertical accent border to the first dimension row column via Color Picker */\n.sn-table .sn-table-cell[columnindex=\"0\"] {\n    font-weight: bold !important;\n    border-left: 4px solid ##COLOR## !important;\n}",

        totalsDoubleTop: "/* Applies a double border line to the top of the individual totals row cells via Color Picker */\n.sn-table-totals-row .sn-table-cell {\n    border-top-style: double !important;\n    border-top-width: 4px !important;\n    border-top-color: ##COLOR## !important;\n}",

        totalsDoubleBottom: "/* Applies a double border line to the bottom of the individual totals row cells via Color Picker */\n.sn-table-totals-row .sn-table-cell {\n    border-bottom-style: double !important;\n    border-bottom-width: 4px !important;\n    border-bottom-color: ##COLOR## !important;\n}",

        headerCellBorders: "/* Apply horizontal separation lines and a custom background fill via Color Picker */\n.sn-table-head-row .sn-table-cell {\n    border-bottom: 2px solid rgb(89, 89, 89) !important;\n    background-color: ##COLOR## !important;\n}",

        headerTextWeight: "/* Optimize column header typography colors via Color Picker */\n.sn-table-head-row .sn-table-cell-text {\n    color: ##COLOR## !important;\n    font-weight: 700 !important;\n}",

        headerColHighlight: "/* Highlight an isolated column header text container via Color Picker */\n.sn-table-head-row [data-col=\"1\"] .sn-table-cell-text {\n    color: ##COLOR## !important;\n}",

        // --- ⚡ TOP BAR & SELECTIONS MODIFIERS ---
        hideGlobalSelectionsToggle: "/* Hide the global selections bar toggle button */\n#currentSelections\\.toggleGlobalSelections {\n    display: none !important;\n}"
    };
});
