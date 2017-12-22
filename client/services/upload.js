angular.module('chat-app').service('uploadService', upload);
function upload ($http, authentication) {
    var uploadFile = function(file) {
        return $http.post('/upload/file', file,  {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": authentication.getToken()
            }
        });
    }
    var uploadImage = function(image) {
        return $http.post('/upload/image', image, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": authentication.getToken()
            }
        });
    }
    var uploadAvatar = function(avatar) {
        return $http.post('/upload/avatar', avatar, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": authentication.getToken()
            }
        });
    }
    return {
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        uploadAvatar: uploadAvatar
    }
}