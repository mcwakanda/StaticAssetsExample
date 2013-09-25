
guidedModel =
{
	File :
	{
		methods :
		{
			processFolder:function()
			{
				var rackspace = require('rackspace');
				var provider = ds.StorageProvider.find("name == 'rackspace'");
				var authObj = rackspace.authenticate(provider.authAPIEndpoint,provider.APIAuthCode, provider.userAuthCode);
				if(provider != null){
					var processFolder = new Folder(ds.getModelFolder().path + "DataFolder/processImage/");
					var containerName = "uploadExample";
					var folderResult = rackspace.createContainer(containerName, true , authObj);
					processFolder.forEachFile(function(file){
						//Should check for file type to set mimeType
						var uploadResult = rackspace.uploadFile(containerName, file, file.name, "image/jpeg", authObj);
						if(uploadResult.status = 201){
							new ds.File({name: file.name, storageProvider: "rackspace", publicURL: folderResult.cdnUri + "/" + file.name}).save();
							file.remove();
						}
					});
					return true;
				} else {
					return false;
				}
			}
		}
	},
	StorageProvider :
	{
		methods :
		{
			updateCredentials:function(providerObject)
			{
				switch(providerObject.name){
					case "rackspace":
						var existingProvider = ds.StorageProvider.find("name = 'rackspace'");
						if(existingProvider == null){
							existingProvider = new ds.StorageProvider({name: "rackspace"});
						}
						existingProvider.APIAuthCode = providerObject.APIAuthCode;
						existingProvider.userAuthCode = providerObject.userAuthCode;
						existingProvider.authAPIEndpoint = "https://identity.api.rackspacecloud.com/v1.0";
						existingProvider.save();
						return true;
						break;
				}
			}
		}
	}
};
