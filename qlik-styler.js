define([
    'jquery',
    'qlik',
    './properties'
], function($, qlik, properties) {
    'use strict';

    return {
        definition: properties,

        paint: function($element, layout) {
            var cssId = 'qlik-styler-final-modular-engine-' + layout.qInfo.qId;
            var $styleTag = $('#' + cssId);
            
            if ($styleTag.length === 0) {
                $styleTag = $("<style>").attr('id', cssId).appendTo("head");
            }
            
            var activeCssBundle = "/* 🎨 Qlik Styler - Custom Studio Engine Outputs */\n\n";
            var rulesAppliedCount = 0;

            if (layout.prop && layout.prop.customCssList && layout.prop.customCssList.length > 0) {
                layout.prop.customCssList.forEach(function(item) {
                    var rawCss = item.cssCode;
                    if (rawCss && rawCss.trim() !== "") {
                        activeCssBundle += rawCss.trim() + "\n\n";
                        rulesAppliedCount++;
                    }
                });
            } else {
                activeCssBundle += "/* No active layout styles found. */";
            }
            
            $styleTag.html(activeCssBundle);
            
            var isEditMode = qlik.navigation.getMode() === "edit";
            var shouldHide = layout.prop && layout.prop.hideExtension;
            
            if (shouldHide && !isEditMode) {
                $element.closest('.qv-object').css({
                    'height': '0px', 'border': 'none', 'margin': '0px', 'padding': '0px', 'overflow': 'hidden', 'visibility': 'hidden'
                });
            } else {
                $element.closest('.qv-object').css({
                    'height': '', 'border': '', 'margin': '', 'padding': '', 'overflow': '', 'visibility': ''
                });
                
                $element.empty();

                var parentObjectContent = $element.closest('.qv-object-content');
                var totalAvailableHeight = parentObjectContent.length > 0 ? parentObjectContent.height() : $element.height();
                
                if (!totalAvailableHeight || totalAvailableHeight < 100) {
                    totalAvailableHeight = 300; 
                }

                var codeBoxMaxHeight = totalAvailableHeight - 90;

                var $statusBox = $(document.createElement('div')).css({
                    'padding': '12px', 
                    'background': '#1c2026', 
                    'color': '#009845', 
                    'font-family': 'sans-serif', 
                    'font-size': '12px', 
                    'border-radius': '4px', 
                    'border-left': '4px solid #009845',
                    'box-sizing': 'border-box',
                    'width': '100%',
                    'height': '100%',
                    'overflow': 'hidden'
                });
                
                var $headerBlock = $(document.createElement('div')).css({ 'margin-bottom': '6px' });
                $headerBlock.html("<strong>🎨 Qlik Styler | Custom Studio</strong><br>Active UI Enhancements: " + rulesAppliedCount);
                $statusBox.append($headerBlock);
                
                var $detailsContainer = $(document.createElement('details')).attr('open', true).css({
                    'display': 'block',
                    'overflow': 'hidden'
                });
                
                var $summaryTag = $(document.createElement('summary')).css({
                    'cursor': 'pointer', 'color': '#a0aab2', 'font-family': 'sans-serif', 'font-size': '12px', 'margin-bottom': '6px'
                }).text('Inspect Active Layout Rules');
                $detailsContainer.append($summaryTag);
                
                var $preCodeTag = $(document.createElement('pre')).css({
                    'color': '#fff', 
                    'background': '#2d3139', 
                    'padding': '8px', 
                    'margin': '0', 
                    'max-height': codeBoxMaxHeight + 'px', 
                    'overflow-y': 'auto',                  
                    'white-space': 'pre-wrap', 
                    'word-break': 'break-all', 
                    'border-radius': '2px', 
                    'font-family': 'monospace', 
                    'box-sizing': 'border-box'
                }).text(activeCssBundle);
                
                $detailsContainer.append($preCodeTag);
                $statusBox.append($detailsContainer);
                $element.append($statusBox);
            }
            
            return qlik.Promise.resolve();
        }
    };
});
