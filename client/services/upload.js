angular.module('chat-app').service('uploadService', upload);
function upload ($http) {
    var uploadFile = function(file) {
        return $http.post('/upload/file', file,  {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined
            }
        });
    }
    var uploadImage = function(image) {
        return $http.post('/upload/image', image, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined
            }
        });
    }
    var uploadAvatar = function(avatar) {
        return $http.post('/upload/avatar', avatar, {
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined
            }
        });
    }
    return {
        uploadFile: uploadFile,
        uploadImage: uploadImage,
        uploadAvatar: uploadAvatar
    }
}