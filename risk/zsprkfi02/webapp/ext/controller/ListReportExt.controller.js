sap.ui.define([ 

        "sap/ui/model/Filter", 
    
        "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    
        "sap/m/ComboBox", 
    
        "zsprk/zsprkfi02/utils/commonFilterUtils" // 공통 모듈 경로 
    
    ], function (Filter, SmartFilterBar, ComboBox, CommonFilterUtils) { 
    
        "use strict"; 
    
        return { 
    
            getCustomAppStateDataExtension: function (oCustomData) { 
    
                // 기존 로직 유지 
    
            }, 
    
            restoreCustomAppStateDataExtension: function (oCustomData) { 
    
                // 기존 로직 유지 
    
            }, 
    
            onInitSmartFilterBarExtension: function (oEvent) { 
    
                var oGlobalFilter = oEvent.getSource(); 
    
                // 공통 함수 호출 
    
                CommonFilterUtils.setDynamicDateFilter( 
    
                    oGlobalFilter,           // SmartFilterBar 인스턴스 
    
                    "StndDate",             // 필터 필드 이름 
    
                    "1000",                 // Bukrs 값 
    
                    "RKFI02",               // Riskid 값 
    
                    "/sap/opu/odata/sap/ZSPRK_R_BANK_CHANGE_UI_V2/" // OData 서비스 URL 
    
                ); 
    
            }, 
    
            onBeforeRebindTableExtension: function (oEvent) { 
    
                // 기존 로직 유지 
    
            } 
    
        }; 
    
    }); 