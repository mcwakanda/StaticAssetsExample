﻿function processFile(request, response){	var fileEntity = new ds.File();	fileEntity.name = request.parts[0].asText;	var folderPath = request.parts[1].asText;	var fullPath = request.parts[2].asText;	if(request.parts.length >1 ){		if(fullPath == "true"){			var theFolder = Folder(folderPath);		} else {			var theFolder = Folder(ds.getModelFolder().path + "DataFolder/" + folderPath);		}		theFolder.create();		var fileName = fileEntity.ID + ".jpg";		var theImage = request.parts[3].asPicture; 		theImage.save(theFolder.path + fileName, ".jpg");		var imageFile = File(theFolder.path + fileName);		theImage.setPath(imageFile);		fileEntity.image = theImage;	}	fileEntity.save();	return true;}