sap.ui.define([ 

        "sap/ui/model/odata/v2/ODataModel" 
    
    ], function (ODataModel) { 

        "use strict"; 
    
        return { 
    
            /** 
    
             * SmartFilterBar에 동적 날짜 필터를 설정하는 공통 함수 
    
             * @param {sap.ui.comp.smartfilterbar.SmartFilterBar} oGlobalFilter - SmartFilterBar 인스턴스 
    
             * @param {string} sFilterField - 필터 필드 이름 (예: "StndDate") 
    
             * @param {string} sBukrs - 회사 코드 (예: "1000") 
    
             * @param {string} sRiskid - Risk ID (예: "RK1001") 
    
             * @param {string} sServiceUrl - OData 서비스 URL (선택적, 기본값 제공) 
    
             */ 
    
            setDynamicDateFilter: function (oGlobalFilter, sFilterField, sBukrs, sRiskid, sServiceUrl) { 
    
                var sODataServiceUrl = sServiceUrl || "/sap/opu/odata/sap/ZSPRK_R_MAST_UI_V2/"; 
    
                var oModel = new ODataModel(sODataServiceUrl, { 
    
                    useBatch: false 
    
                }); 
    
                // 기본 날짜 설정 함수 
    
                var setDefaultFilter = function (iDays) { 
    
                    var oToday = new Date(); 
    
                    var oStartDate = new Date(oToday); 
    
                    oStartDate.setDate(oToday.getDate() - iDays); 
    
                    var sStartDate = oStartDate.toISOString().split("T")[0]; 
    
                    var sEndDate = oToday.toISOString().split("T")[0]; 
    
                    var oDefaultFilter = {}; 
    
                    oDefaultFilter[sFilterField] = { 
    
                        "ranges": [{ 
    
                            "exclude": false, 
    
                            "operation": "BT", 
    
                            "keyField": sFilterField, 
    
                            "value1": sStartDate, 
    
                            "value2": sEndDate 
    
                        }] 
    
                    }; 
    
                    oGlobalFilter.setFilterData(oDefaultFilter); 
    
                }; 
    
                // OData 조회 
    
                oModel.read(`/Mast(Bukrs='${sBukrs}',Riskid='${sRiskid}')`, { 
    
                    success: function (oData) { 
    
                        var iChkDays = oData.ChkDays || 0; 
    
                        var iDays = (iChkDays > 0) ? iChkDays : 10; // 0이면 10일 
    
                        setDefaultFilter(iDays); 
    
                    }, 
    
                    error: function (oError) { 
    
                        console.error("OData 조회 실패: ", oError); 
    
                        setDefaultFilter(10); // 실패 시 10일 
    
                    } 
    
                }); 
    
            } 
    
        }; 
    
    }); 