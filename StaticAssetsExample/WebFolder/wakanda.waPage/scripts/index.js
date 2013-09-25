
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var deleteFileButton = {};	// @button
	var saveFileButton2 = {};	// @button
	var fileNameInput2 = {};	// @textField
	var documentEvent = {};	// @document
	var saveFileButton = {};	// @button
	var newFileButton = {};	// @button
	var fileEvent = {};	// @dataSource
	var fileNameInput = {};	// @textField
	var folderNameInput = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	deleteFileButton.click = function deleteFileButton_click (event)// @startlock
	{// @endlock
		sources.file.removeCurrent();
	};// @lock

	saveFileButton2.click = function saveFileButton2_click (event)// @startlock
	{// @endlock
		var fileSelector = document.getElementById("fileSelector");
		var uploadForm = new FormData();
		uploadForm.append("name", sources.fileUpload.name);
		uploadForm.append("path", $$('pathInput').getValue());
		uploadForm.append("fullPath", $$('fullPathCheckbox').getValue());
		
		if(fileSelector.files.length > 0){
			uploadForm.append("image", fileSelector.files[0]);
		}
		
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			sources.file.all();
			//clear file selector
			fileSelector = $("#fileSelector");
			fileSelector.replaceWith(fileSelector = fileSelector.clone( true ));
			$$("fileNameInput2").setValue("");
		}
		xhr.open("POST", "/uploadFile", true);
		xhr.send(uploadForm);
		$$('pathInput').setValue("");
	};// @lock

	fileNameInput2.keyup = function fileNameInput2_keyup (event)// @startlock
	{// @endlock
		$$("folderUploader").setFolderName($$("folderNameInput").getValue());
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if(sources.file.length == 0){
			$$("fileNameInput").disable();
			$$("datastoreUploader").disable();
		} else if(sources.file.isNew() == true){
			$$("datastoreUploader").disable();
		}
	};// @lock

	saveFileButton.click = function saveFileButton_click (event)// @startlock
	{// @endlock
		sources.file.save({
			onSuccess: function(event){
				$$("datastoreUploader").enable();
			}
		});
	};// @lock

	newFileButton.click = function newFileButton_click (event)// @startlock
	{// @endlock
		sources.file.addNewElement();
	};// @lock

	fileEvent.onCollectionChange = function fileEvent_onCollectionChange (event)// @startlock
	{// @endlock
		if(sources.file.length != 0){
			$$("fileNameInput").enable();
			if(sources.file.isNewElement() == true){
				$$("datastoreUploader").disable();
			} else {
				$$("datastoreUploader").enable();
			}
		} else {
			$$("fileNameInput").disable();
			$$("datastoreUploader").disable();
		}		
	};// @lock

	fileNameInput.keyup = function fileNameInput_keyup (event)// @startlock
	{// @endlock
		$$("folderUploader").setFolderName($$("folderNameInput").getValue());
	};// @lock

	folderNameInput.keyup = function folderNameInput_keyup (event)// @startlock
	{// @endlock
		$$("folderUploader").setFolderName($$("folderNameInput").getValue());
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("deleteFileButton", "click", deleteFileButton.click, "WAF");
	WAF.addListener("saveFileButton2", "click", saveFileButton2.click, "WAF");
	WAF.addListener("fileNameInput2", "keyup", fileNameInput2.keyup, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("saveFileButton", "click", saveFileButton.click, "WAF");
	WAF.addListener("newFileButton", "click", newFileButton.click, "WAF");
	WAF.addListener("file", "onCollectionChange", fileEvent.onCollectionChange, "WAF");
	WAF.addListener("fileNameInput", "keyup", fileNameInput.keyup, "WAF");
	WAF.addListener("folderNameInput", "keyup", folderNameInput.keyup, "WAF");
// @endregion
};// @endlock
