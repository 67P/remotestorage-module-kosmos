var RemoteStorage = require('remotestoragejs');

var Kosmos = function(privateClient/*, publicClient*/) {

  var extend = RemoteStorage.util.extend;

  //
  // Types/Schemas
  //

  var baseProperties = {
    "id": {
      "type": "string"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  };

  privateClient.declareType('space', {
    "type": "object",
    "properties": extend({
      "id": {
        "type": "string",
      },
      "name": {
        "type": "string",
      },
      "protocol": {
        "type": "string",
        "default": "IRC",
        "enum": ["IRC", "XMPP", "Mattermost", "Slack"]
      },
      "server": {
        "type": "object",
        "properties": {
          "hostname": {
            "type": "string"
          },
          "port": {
            "type": "number"
          },
          "secure": {
            "type": "boolean"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "nickname": {
            "type": "string"
          },
        }
      },
      "channels": {
        "type": "array",
        "default": []
      },
    }, baseProperties),
    "required": ["id", "name", "protocol", "server"]
  });

  //
  // Public functions
  //

  var kosmos = {

    spaces: {

      getAll() {
        return privateClient.getAll('spaces/');
      },

      store(params) {
        if (!params.createdAt) { params.createdAt = new Date().toISOString(); }

        return privateClient.storeObject('space', `spaces/${params.id}`, params);
      },

      remove(id) {
        return privateClient.remove(`spaces/${id}`);
      }

    },

    // TODO remove
    client: privateClient
  };

  //
  // Return public functions
  //

  return { exports: kosmos };

};

export default { name: 'kosmos', builder: Kosmos };
