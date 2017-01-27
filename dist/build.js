(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("remotestoragejs"));
	else if(typeof define === 'function' && define.amd)
		define(["remotestoragejs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("remotestoragejs")) : factory(root["RemoteStorage"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * File: Kosmos
	 *
	 * Maintainer: - Sebastian Kippe <sebastian@kip.pe>
	 * Version:    - 0.1.0
	 *
	 * This module manages data related to the Kosmos group communication suite
	 */
	
	var RemoteStorage = __webpack_require__(1);
	
	RemoteStorage.defineModule('kosmos', function (privateClient /*, publicClient*/) {
	
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
	        "type": "string"
	      },
	      "name": {
	        "type": "string"
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
	          }
	        }
	      },
	      "channels": {
	        "type": "array",
	        "default": []
	      }
	    }, baseProperties),
	    "required": ["id", "name", "protocol", "server"]
	  });
	
	  //
	  // Public functions
	  //
	
	  var kosmos = {
	
	    spaces: {
	      getAll: function getAll() {
	        return privateClient.getAll('spaces/');
	      },
	      store: function store(params) {
	        if (!params.createdAt) {
	          params.createdAt = new Date().toISOString();
	        }
	
	        return privateClient.storeObject('space', 'spaces/' + params.id, params);
	      },
	      remove: function remove(id) {
	        return privateClient.remove('spaces/' + id);
	      }
	    },
	
	    // TODO remove
	    client: privateClient
	  };
	
	  //
	  // Return public functions
	  //
	
	  return { exports: kosmos };
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map