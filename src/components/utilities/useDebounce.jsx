import React from "react";

export const useDebounce = function(fn, d){
    let timer;
    return function(){
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(context, args);
        }, d);
    }
}