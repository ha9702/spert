sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'spertgjha/exrapcrud/test/integration/FirstJourney',
		'spertgjha/exrapcrud/test/integration/pages/UserMain'
    ],
    function(JourneyRunner, opaJourney, UserMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('spertgjha/exrapcrud') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheUserMain: UserMain
                }
            },
            opaJourney.run
        );
    }
);