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
        "type": [ "string", "null" ]
      },
      "password": {
        "type": [ "string", "null" ]
      },
      "nickname": {
        "type": [ "string", "null" ]
      },
      "server": {
        "type": "object",
        "properties": {
          "hostname": {
          "type": [ "string", "null" ]
          },
          "port": {
            "type": [ "number", "null" ]
          },
          "secure": {
            "type": "boolean"
          }
        }
      },
      "botkaURL": {
        "type": [ "string", "null" ]
      }
    },
    "required": [
      "id",
      "protocol"
    ]
  });

  privateClient.declareType('chat-channel', {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
      },
      "accountId": {
        "type": "string"
      },
      "displayName": {
        "type": [ "string", "null" ]
      },
      "userNickname": {
        "type": [ "string", "null" ]
      },
      "topic": {
        "type": [ "string", "null" ]
      },
      "description": {
        "type": [ "string", "null" ]
      },
      "isLogged": {
        "type": [ "boolean", "null" ]
      }
    },
    "required": [
      "id",
      "accountId"
    ]
  });

  //
  // Public functions
  //

  const kosmos = {

    accounts: {
      getIds() {
        return privateClient.getListing('chat/').then(listing => {
          return Object.keys(listing).map(id => id.replace(/\/$/, ''));
        });
      },

      getConfig(id) {
        return privateClient.getObject(`chat/${id}/account`);
      },

      storeConfig(obj) {
        return privateClient.storeObject('chat-account', `chat/${obj.id}/account`, obj);
      },

      // TODO recursively remove all files
      remove(id) {
        return privateClient.remove(`chat/${id}/account`);
      }
    },

    channels: {
      getAll(accountId) {
        return privateClient.getAll(`chat/${accountId}/channels/`);
      },

      store(obj) {
        return privateClient.storeObject('chat-channel', `chat/${obj.accountId}/channels/${obj.id}`, obj);
      },

      remove(accountId, id) {
        return privateClient.remove(`chat/${accountId}/channels/${id}`);
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
