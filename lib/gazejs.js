/*
 * BridJS - Dynamic and blazing-fast native interop for JavaScript.
 * https://github.com/jiahansu/GazeJS
 *
 * Copyright (c) 2013-2013, Jia-Han Su (https://github.com/jiahansu)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Olivier Chafik nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY JIA-HAN SU AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var my = require("myclass"), bridjs = require("bridjs");
        TobiiGaze = require("./tobii/gaze"), 
        TobiiConfig = require("./tobii/config"), 
        ErrorCodes = require("./tobii/error_codes"), 
        DataTypes = require("./tobii/data_types"), 
        GazeException = require("./gaze_exception"), 
        CallbackTypes = require("./tobii/callback_types")
        tobiiGaze = new TobiiGaze(), 
        tobiiConfig = new TobiiConfig();

module.exports = my.Class({
    STATIC:{
        tobii: my.Class({
            STATIC:{
                gaze: tobiiGaze,
                config: tobiiConfig,
                errorCodes: ErrorCodes,
                dataTypes:DataTypes,
                callbackTypes:CallbackTypes
            }
        }),
        
        checkError:function(errorCode){
            var value;
            
            if(typeof(errorCode)==="number"){
                value = errorCode;
            }else{
                value = errorCode.get();
            }

            if(value!==ErrorCodes.SUCCESS){
                throw new GazeException("Gaze error :"+tobiiGaze.getErrorMessage(value));
            }
        },
        
        toString:function(buffer){
            return bridjs.toString(buffer);
        },
        
        newCallback:function(signature, func){
            return bridjs.newCallback(signature,func);
        },
        
        async:function(module){
            return bridjs.async(module);
        }
    }
});
