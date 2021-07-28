const Kosmos = function(privateClient/*, publicClient*/) {

  //
  // Types/Schemas
  //

  privateClient.declareType('chat-account', {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
      },
      "protocol": {
        "type": "string",
        "default": "IRC",
        "enum": ["IRC", "XMPP"] // Mattermost, Slack, ...
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
          }
        }
      },
      "botkaURL": {
        "type": "string"
      }
    },
    "required": [
      "id",
      "protocol"
    ]
  });

  //
  // Public functions
  //

  const kosmos = {

    accounts: {

      getIds() {
        return privateClient.getListing('chat/').then(listing => {
          return Object.keys(listing);
        });
      },

      getConfig(id) {
        return privateClient.getAll(`chat/${id}/account`);
      },

      storeConfig(obj) {
        return privateClient.storeObject('chat-account', `chat/${obj.id}/account`, obj);
      },

      // TODO recursively remove all files
      remove(id) {
        return privateClient.remove(`chat/${id}/account`);
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
