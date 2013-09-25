
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var fileGrid = {};	// @dataGrid
	var fileUpload1 = {};	// @fileUpload
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	fileGrid.onRowDraw = function fileGrid_onRowDraw (event)// @startlock
	{// @endlock
		if(event.row.cells[0].value != null){
			var newContent = '<div class="content" style="width: 70px; height: 27px;">' + '<img src="' + event.row.cells[2].value + '"' + ' width="20px" height="20px"/>' + '</div>'
			console.log(newContent);
			event.row.cells[0].insideCell[0].innerHTML = newContent;
		}

	};// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		ds.File.processFolder({
			onSuccess: function(e){
				if(e.result == true){
					sources.file.all();
					alert("Files uploaded");
				}
			}
		});
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var providerObject = {
			name: "rackspace",
			APIAuthCode: $$('APIAuthCodeInput').getValue(),
			userAuthCode: $$('usernameInput').getValue()
		}
		ds.StorageProvider.updateCredentials({
			onSuccess: function(e){
				if(e.result == true){
					alert("Provider credentials saved.")
				}
			}
		},providerObject);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("fileGrid", "onRowDraw", fileGrid.onRowDraw, "WAF");
	WAF.addListener("fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
