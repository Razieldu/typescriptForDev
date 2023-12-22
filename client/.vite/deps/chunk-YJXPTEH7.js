var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@vue/shared/dist/shared.esm-bundler.js
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var NOOP = () => {
};
var NO = () => false;
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isDate = (val) => toTypeString(val) === "[object Date]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
var isBuiltInDirective = makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
var toHandlerKey = cacheStringFunction(
  (str) => str ? `on${capitalize(str)}` : ``
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
var def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
var looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
var toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console";
var isGloballyWhitelisted = makeMap(GLOBALS_WHITE_LISTED);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
var isHTMLTag = makeMap(HTML_TAGS);
var isSVGTag = makeMap(SVG_TAGS);
var isVoidTag = makeMap(VOID_TAGS);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
var isBooleanAttr = makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
var isKnownHtmlAttr = makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
var isKnownSvgAttr = makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
var toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;
var EffectScope = class {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (true) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
};
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (true) {
    warn(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}
var createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
var newTracked = (dep) => (dep.n & trackOpBit) > 0;
var initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
var finalizeDepMarkers = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
var targetMap = /* @__PURE__ */ new WeakMap();
var effectTrackDepth = 0;
var trackOpBit = 1;
var maxMarkerBits = 30;
var activeEffect;
var ITERATE_KEY = Symbol(true ? "iterate" : "");
var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
var ReactiveEffect = class {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
};
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = true ? { effect: activeEffect, target, type, key } : void 0;
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(
        extend(
          {
            effect: activeEffect
          },
          debuggerEventExtraInfo
        )
      );
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = true ? { target, type, key, newValue, oldValue, oldTarget } : void 0;
  if (deps.length === 1) {
    if (deps[0]) {
      if (true) {
        triggerEffects(deps[0], eventInfo);
      } else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    if (true) {
      triggerEffects(createDep(effects), eventInfo);
    } else {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.onTrigger) {
      effect2.onTrigger(extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
var get$1 = createGetter();
var shallowGet = createGetter(false, true);
var readonlyGet = createGetter(true);
var shallowReadonlyGet = createGetter(true, true);
var arrayInstrumentations = createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty2(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
var set$1 = createSetter();
var shallowSet = createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
};
var shallowReactiveHandlers = extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
);
var shallowReadonlyHandlers = extend(
  {},
  readonlyHandlers,
  {
    get: shallowReadonlyGet
  }
);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow3 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow3) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow3) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
var [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    if (true) {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    } else {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    if (true) {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    } else {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
};
function triggerRef(ref2) {
  triggerRefValue(ref2, true ? ref2.value : void 0);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
var ObjectRefImpl = class {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
};
var GetterRefImpl = class {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
};
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(
    source,
    key,
    defaultValue
  );
}
var ComputedRefImpl = class {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
};
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = true ? () => {
      console.warn("Write operation failed: computed value is readonly");
    } : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
var tick = Promise.resolve();

// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn2(msg, ...args) {
  if (false)
    return;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (false)
    return;
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn2(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn2(`${type} is NaN - the duration expression might be incorrect.`);
  }
}
var ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = true ? ErrorTypeStrings[type] : type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (true) {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
    console.error(err);
  }
}
var isFlushing = false;
var isFlushPending = false;
var queue = [];
var flushIndex = 0;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (true) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (true) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = (job) => job.id == null ? Infinity : job.id;
var comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (true) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = true ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn2(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */ new Set();
if (true) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
var devtools;
var buffer = [];
var devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount", app);
}
var devtoolsComponentAdded = createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
var devtoolsComponentUpdated = createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
var _devtoolsComponentRemoved = createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
var devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
var devtoolsPerfStart = createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
var devtoolsPerfEnd = createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (true) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn2(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn2(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (true) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (true) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn2(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (true) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
var accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (true) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render2.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render22.length > 1 ? render22(
          props,
          true ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn2(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn2(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn2(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn2(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
var getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
var getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
var isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
var INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn2(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  if (!cb) {
    if (immediate !== void 0) {
      warn2(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn2(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s) => {
    warn2(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(
        (v, i) => hasChanged(v, oldValue[i])
      ) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, scheduler);
  if (true) {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  const unwatch = () => {
    effect2.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect2);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn2("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    warn2(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
var BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (hasFound) {
              warn2(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            child = c;
            hasFound = true;
            if (false)
              break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn2(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook3 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook3(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook3(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook3(cancelHook, [el]);
        } else {
          callHook3(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook3(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook3(onLeaveCancelled, [el]);
        } else {
          callHook3(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (true) {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn2(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
var createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook(
  "rtg"
);
var onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
var COMPONENTS = "components";
var DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else if (true) {
    warn2(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn2(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res)
          res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot.length > 1) {
    warn2(
      `SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`
    );
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  if (!isObject(obj)) {
    warn2(`v-on with no argument expects an object value.`);
    return ret;
  }
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
  }
  return ret;
}
var getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => true ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => true ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => true ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => true ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
  })
);
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn2(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn2(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn2(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn2(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn2(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn2(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
var RuntimeCompiledPublicInstanceProxyHandlers = extend(
  {},
  PublicInstanceProxyHandlers,
  {
    get(target, key) {
      if (key === Symbol.unscopables) {
        return;
      }
      return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
      const has2 = key[0] !== "_" && !isGloballyWhitelisted(key);
      if (!has2 && PublicInstanceProxyHandlers.has(_, key)) {
        warn2(
          `Property ${JSON.stringify(
            key
          )} should not start with _ which is a reserved prefix for Vue internals.`
        );
      }
      return has2;
    }
  }
);
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn2(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function getContext() {
  const i = getCurrentInstance();
  if (!i) {
    warn2(`useContext() called without active instance.`);
  }
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn2(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
var shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = true ? createDuplicateChecker() : null;
  if (true) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (true) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (true) {
          checkDuplicateProperties("Methods", key);
        }
      } else if (true) {
        warn2(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn2(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn2(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
      warn2(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      if (true) {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn2(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : true ? () => {
        warn2(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : NOOP;
      const c = computed2({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (true) {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (true) {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (true) {
      warn2(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (true) {
        warn2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (true) {
    warn2(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn2(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn2(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    if (true) {
      Object.defineProperty(context.config, "unwrapInjectedRef", {
        get() {
          return true;
        },
        set() {
          warn2(
            `app.config.unwrapInjectedRef has been deprecated. 3.3 now alawys unwraps injected refs in Options API.`
          );
        }
      });
    }
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (true) {
          warn2(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn2(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (true) {
          warn2(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        if (__VUE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (true) {
            warn2(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        } else if (true) {
          warn2("Mixins are only available in builds supporting Options API");
        }
        return app;
      },
      component(name, component) {
        if (true) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn2(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (true) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn2(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn2(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(
            rootComponent,
            rootProps
          );
          vnode.appContext = context;
          if (true) {
            context.reload = () => {
              render2(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (true) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (true) {
          warn2(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          if (true) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (true) {
          warn2(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn2(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
var currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    if (true) {
      warn2(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (true) {
      warn2(`injection "${String(key)}" not found.`);
    }
  } else if (true) {
    warn2(`inject() can only be used inside setup() or functional components.`);
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn2(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn2(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else if (true) {
    warn2(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn2('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn2(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn2('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
var isSimpleType = makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
var isInternalKey = (key) => key[0] === "_" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn2(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (true) {
        warn2(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn2(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
var updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn2(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (true) {
          warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (true) {
      warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
var supported;
var perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (true) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (true) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
function initFeatureFlags() {
  const needWarn = [];
  if (typeof __VUE_OPTIONS_API__ !== "boolean") {
    needWarn.push(`__VUE_OPTIONS_API__`);
    getGlobalThis().__VUE_OPTIONS_API__ = true;
  }
  if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
    needWarn.push(`__VUE_PROD_DEVTOOLS__`);
    getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
  }
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (true) {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (true) {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (true) {
          warn2("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        isSVG
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (true) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
      if (true) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (true) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (true) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (true) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (true) {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
    if (true) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (true) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (true) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (true) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (true) {
              endMeasure(instance, `render`);
            }
            if (true) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (true) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (true) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (true) {
            endMeasure(instance, `render`);
          }
          if (true) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          if (true) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (true) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (true) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (true) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (true) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (true) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        if (true) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (true) {
          devtoolsComponentUpdated(instance);
        }
        if (true) {
          popWarningContext();
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect2.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (true) {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn2(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (true) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
var isTeleport = (type) => type.__isTeleport;
var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
var resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      warn2(
        `Current renderer does not support string target for Teleports. (missing querySelector renderer option)`
      );
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
        warn2(
          `Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
        );
      }
      return target;
    }
  } else {
    if (!targetSelector && !isTeleportDisabled(props)) {
      warn2(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
var TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = true ? createComment("teleport start") : createText("");
      const mainAnchor = n2.anchor = true ? createComment("teleport end") : createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      } else if (!disabled) {
        warn2("Invalid Teleport target on mount:", target, `(${typeof target})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          } else if (true) {
            warn2(
              "Invalid Teleport target on update:",
              target,
              `(${typeof target})`
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            true,
            !!child.dynamicChildren
          );
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(
          targetNode,
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
var Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
var vnodeArgsTransformer;
var createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args
  );
};
var InternalObjectKey = `__vInternal`;
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn2(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
var createVNode = true ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn2(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn2(
      `Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (true) {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var globalCurrentInstanceSetters;
var settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
var setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
var unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
var isBuiltInTag = makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn2(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (true) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn2(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (true) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [true ? shallowReadonly(instance.props) : instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn2(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn2(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (true) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (true) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn2(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
var isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (true) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (true) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (__VUE_OPTIONS_API__ && true) {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (!compile && Component.template) {
      warn2(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn2(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    true ? {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
      }
    } : {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (true) {
      if (instance.exposed) {
        warn2(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn2(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (true) {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
var computed2 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn2(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
function isShallow2(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow2(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow2(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed3 = extractKeys(instance, "computed");
    if (computed3) {
      blocks.push(createInstanceBlock("computed", computed3));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow2(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
var version = "3.3.4";

// node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var svgNS = "http://www.w3.org/2000/svg";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && doc.createElement("template");
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
var semicolonRE = /[^\\];\s*$/;
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (true) {
      if (semicolonRE.test(val)) {
        warn2(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn2(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
var cachedNow = 0;
var p = Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
var nativeOnRE = /^on[a-z]/;
var patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
var TRANSITION = "transition";
var ANIMATION = "animation";
var Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
var TransitionPropsValidators = Transition.props = extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
var callHook2 = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook2(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook2(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook2(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook2(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook2(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook2(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook2(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  if (true) {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
var positionMap = /* @__PURE__ */ new WeakMap();
var newPositionMap = /* @__PURE__ */ new WeakMap();
var TransitionGroupImpl = {
  name: "TransitionGroup",
  props: extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        } else if (true) {
          warn2(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
var removeMode = (props) => delete props.mode;
removeMode(TransitionGroupImpl.props);
var TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
var getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
var vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && looseToNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
var vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el._assign;
      if (isArray(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if (isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}
var vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el._assign(getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
var systemModifiers = ["ctrl", "shift", "alt", "meta"];
var modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
var keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
var withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
var vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
var rendererOptions = extend({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
var render = (...args) => {
  ensureRenderer().render(...args);
};
var createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  if (true) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn2(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn2(msg);
        return compilerOptions;
      },
      set() {
        warn2(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn2(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn2(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}

// node_modules/vue/dist/vue.runtime.esm-bundler.js
function initDev() {
  {
    initCustomFormatter();
  }
}
if (true) {
  initDev();
}

// node_modules/@element-plus/icons-vue/dist/index.js
var add_location_vue_vue_type_script_lang_default = {
  name: "AddLocation"
};
var export_helper_default = (sfc, props) => {
  let target = sfc.__vccOpts || sfc;
  for (let [key, val] of props)
    target[key] = val;
  return target;
};
var _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_4 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var add_location_default = export_helper_default(add_location_vue_vue_type_script_lang_default, [["render", _sfc_render], ["__file", "add-location.vue"]]);
var aim_vue_vue_type_script_lang_default = {
  name: "Aim"
};
var _hoisted_12 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_22 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_32 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_42 = [
  _hoisted_22,
  _hoisted_32
];
function _sfc_render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_12, _hoisted_42);
}
var aim_default = export_helper_default(aim_vue_vue_type_script_lang_default, [["render", _sfc_render2], ["__file", "aim.vue"]]);
var alarm_clock_vue_vue_type_script_lang_default = {
  name: "AlarmClock"
};
var _hoisted_13 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_23 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 832a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_33 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m292.288 824.576 55.424 32-48 83.136a32 32 0 1 1-55.424-32l48-83.136zm439.424 0-55.424 32 48 83.136a32 32 0 1 0 55.424-32l-48-83.136zM512 512h160a32 32 0 1 1 0 64H480a32 32 0 0 1-32-32V320a32 32 0 0 1 64 0v192zM90.496 312.256A160 160 0 0 1 312.32 90.496l-46.848 46.848a96 96 0 0 0-128 128L90.56 312.256zm835.264 0A160 160 0 0 0 704 90.496l46.848 46.848a96 96 0 0 1 128 128l46.912 46.912z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_43 = [
  _hoisted_23,
  _hoisted_33
];
function _sfc_render3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_13, _hoisted_43);
}
var alarm_clock_default = export_helper_default(alarm_clock_vue_vue_type_script_lang_default, [["render", _sfc_render3], ["__file", "alarm-clock.vue"]]);
var apple_vue_vue_type_script_lang_default = {
  name: "Apple"
};
var _hoisted_14 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_24 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M599.872 203.776a189.44 189.44 0 0 1 64.384-4.672l2.624.128c31.168 1.024 51.2 4.096 79.488 16.32 37.632 16.128 74.496 45.056 111.488 89.344 96.384 115.264 82.752 372.8-34.752 521.728-7.68 9.728-32 41.6-30.72 39.936a426.624 426.624 0 0 1-30.08 35.776c-31.232 32.576-65.28 49.216-110.08 50.048-31.36.64-53.568-5.312-84.288-18.752l-6.528-2.88c-20.992-9.216-30.592-11.904-47.296-11.904-18.112 0-28.608 2.88-51.136 12.672l-6.464 2.816c-28.416 12.224-48.32 18.048-76.16 19.2-74.112 2.752-116.928-38.08-180.672-132.16-96.64-142.08-132.608-349.312-55.04-486.4 46.272-81.92 129.92-133.632 220.672-135.04 32.832-.576 60.288 6.848 99.648 22.72 27.136 10.88 34.752 13.76 37.376 14.272 16.256-20.16 27.776-36.992 34.56-50.24 13.568-26.304 27.2-59.968 40.704-100.8a32 32 0 1 1 60.8 20.224c-12.608 37.888-25.408 70.4-38.528 97.664zm-51.52 78.08c-14.528 17.792-31.808 37.376-51.904 58.816a32 32 0 1 1-46.72-43.776l12.288-13.248c-28.032-11.2-61.248-26.688-95.68-26.112-70.4 1.088-135.296 41.6-171.648 105.792C121.6 492.608 176 684.16 247.296 788.992c34.816 51.328 76.352 108.992 130.944 106.944 52.48-2.112 72.32-34.688 135.872-34.688 63.552 0 81.28 34.688 136.96 33.536 56.448-1.088 75.776-39.04 126.848-103.872 107.904-136.768 107.904-362.752 35.776-449.088-72.192-86.272-124.672-84.096-151.68-85.12-41.472-4.288-81.6 12.544-113.664 25.152z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_34 = [
  _hoisted_24
];
function _sfc_render4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_14, _hoisted_34);
}
var apple_default = export_helper_default(apple_vue_vue_type_script_lang_default, [["render", _sfc_render4], ["__file", "apple.vue"]]);
var arrow_down_bold_vue_vue_type_script_lang_default = {
  name: "ArrowDownBold"
};
var _hoisted_15 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_25 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_35 = [
  _hoisted_25
];
function _sfc_render5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_15, _hoisted_35);
}
var arrow_down_bold_default = export_helper_default(arrow_down_bold_vue_vue_type_script_lang_default, [["render", _sfc_render5], ["__file", "arrow-down-bold.vue"]]);
var arrow_down_vue_vue_type_script_lang_default = {
  name: "ArrowDown"
};
var _hoisted_16 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_26 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_36 = [
  _hoisted_26
];
function _sfc_render6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_16, _hoisted_36);
}
var arrow_down_default = export_helper_default(arrow_down_vue_vue_type_script_lang_default, [["render", _sfc_render6], ["__file", "arrow-down.vue"]]);
var arrow_left_bold_vue_vue_type_script_lang_default = {
  name: "ArrowLeftBold"
};
var _hoisted_17 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_27 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_37 = [
  _hoisted_27
];
function _sfc_render7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_17, _hoisted_37);
}
var arrow_left_bold_default = export_helper_default(arrow_left_bold_vue_vue_type_script_lang_default, [["render", _sfc_render7], ["__file", "arrow-left-bold.vue"]]);
var arrow_left_vue_vue_type_script_lang_default = {
  name: "ArrowLeft"
};
var _hoisted_18 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_28 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_38 = [
  _hoisted_28
];
function _sfc_render8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_18, _hoisted_38);
}
var arrow_left_default = export_helper_default(arrow_left_vue_vue_type_script_lang_default, [["render", _sfc_render8], ["__file", "arrow-left.vue"]]);
var arrow_right_bold_vue_vue_type_script_lang_default = {
  name: "ArrowRightBold"
};
var _hoisted_19 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_29 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_39 = [
  _hoisted_29
];
function _sfc_render9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_19, _hoisted_39);
}
var arrow_right_bold_default = export_helper_default(arrow_right_bold_vue_vue_type_script_lang_default, [["render", _sfc_render9], ["__file", "arrow-right-bold.vue"]]);
var arrow_right_vue_vue_type_script_lang_default = {
  name: "ArrowRight"
};
var _hoisted_110 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_210 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_310 = [
  _hoisted_210
];
function _sfc_render10(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_110, _hoisted_310);
}
var arrow_right_default = export_helper_default(arrow_right_vue_vue_type_script_lang_default, [["render", _sfc_render10], ["__file", "arrow-right.vue"]]);
var arrow_up_bold_vue_vue_type_script_lang_default = {
  name: "ArrowUpBold"
};
var _hoisted_111 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_211 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_311 = [
  _hoisted_211
];
function _sfc_render11(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_111, _hoisted_311);
}
var arrow_up_bold_default = export_helper_default(arrow_up_bold_vue_vue_type_script_lang_default, [["render", _sfc_render11], ["__file", "arrow-up-bold.vue"]]);
var arrow_up_vue_vue_type_script_lang_default = {
  name: "ArrowUp"
};
var _hoisted_112 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_212 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_312 = [
  _hoisted_212
];
function _sfc_render12(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_112, _hoisted_312);
}
var arrow_up_default = export_helper_default(arrow_up_vue_vue_type_script_lang_default, [["render", _sfc_render12], ["__file", "arrow-up.vue"]]);
var avatar_vue_vue_type_script_lang_default = {
  name: "Avatar"
};
var _hoisted_113 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_213 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_313 = [
  _hoisted_213
];
function _sfc_render13(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_113, _hoisted_313);
}
var avatar_default = export_helper_default(avatar_vue_vue_type_script_lang_default, [["render", _sfc_render13], ["__file", "avatar.vue"]]);
var back_vue_vue_type_script_lang_default = {
  name: "Back"
};
var _hoisted_114 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_214 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_314 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_44 = [
  _hoisted_214,
  _hoisted_314
];
function _sfc_render14(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_114, _hoisted_44);
}
var back_default = export_helper_default(back_vue_vue_type_script_lang_default, [["render", _sfc_render14], ["__file", "back.vue"]]);
var baseball_vue_vue_type_script_lang_default = {
  name: "Baseball"
};
var _hoisted_115 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_215 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M195.2 828.8a448 448 0 1 1 633.6-633.6 448 448 0 0 1-633.6 633.6zm45.248-45.248a384 384 0 1 0 543.104-543.104 384 384 0 0 0-543.104 543.104z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_315 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M497.472 96.896c22.784 4.672 44.416 9.472 64.896 14.528a256.128 256.128 0 0 0 350.208 350.208c5.056 20.48 9.856 42.112 14.528 64.896A320.128 320.128 0 0 1 497.472 96.896zM108.48 491.904a320.128 320.128 0 0 1 423.616 423.68c-23.04-3.648-44.992-7.424-65.728-11.52a256.128 256.128 0 0 0-346.496-346.432 1736.64 1736.64 0 0 1-11.392-65.728z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_45 = [
  _hoisted_215,
  _hoisted_315
];
function _sfc_render15(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_115, _hoisted_45);
}
var baseball_default = export_helper_default(baseball_vue_vue_type_script_lang_default, [["render", _sfc_render15], ["__file", "baseball.vue"]]);
var basketball_vue_vue_type_script_lang_default = {
  name: "Basketball"
};
var _hoisted_116 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_216 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M778.752 788.224a382.464 382.464 0 0 0 116.032-245.632 256.512 256.512 0 0 0-241.728-13.952 762.88 762.88 0 0 1 125.696 259.584zm-55.04 44.224a699.648 699.648 0 0 0-125.056-269.632 256.128 256.128 0 0 0-56.064 331.968 382.72 382.72 0 0 0 181.12-62.336zm-254.08 61.248A320.128 320.128 0 0 1 557.76 513.6a715.84 715.84 0 0 0-48.192-48.128 320.128 320.128 0 0 1-379.264 88.384 382.4 382.4 0 0 0 110.144 229.696 382.4 382.4 0 0 0 229.184 110.08zM129.28 481.088a256.128 256.128 0 0 0 331.072-56.448 699.648 699.648 0 0 0-268.8-124.352 382.656 382.656 0 0 0-62.272 180.8zm106.56-235.84a762.88 762.88 0 0 1 258.688 125.056 256.512 256.512 0 0 0-13.44-241.088A382.464 382.464 0 0 0 235.84 245.248zm318.08-114.944c40.576 89.536 37.76 193.92-8.448 281.344a779.84 779.84 0 0 1 66.176 66.112 320.832 320.832 0 0 1 282.112-8.128 382.4 382.4 0 0 0-110.144-229.12 382.4 382.4 0 0 0-229.632-110.208zM828.8 828.8a448 448 0 1 1-633.6-633.6 448 448 0 0 1 633.6 633.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_316 = [
  _hoisted_216
];
function _sfc_render16(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_116, _hoisted_316);
}
var basketball_default = export_helper_default(basketball_vue_vue_type_script_lang_default, [["render", _sfc_render16], ["__file", "basketball.vue"]]);
var bell_filled_vue_vue_type_script_lang_default = {
  name: "BellFilled"
};
var _hoisted_117 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_217 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 0 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_317 = [
  _hoisted_217
];
function _sfc_render17(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_117, _hoisted_317);
}
var bell_filled_default = export_helper_default(bell_filled_vue_vue_type_script_lang_default, [["render", _sfc_render17], ["__file", "bell-filled.vue"]]);
var bell_vue_vue_type_script_lang_default = {
  name: "Bell"
};
var _hoisted_118 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_218 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a64 64 0 0 1 64 64v64H448v-64a64 64 0 0 1 64-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_318 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 768h512V448a256 256 0 1 0-512 0v320zm256-640a320 320 0 0 1 320 320v384H192V448a320 320 0 0 1 320-320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_46 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm352 128h128a64 64 0 0 1-128 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_52 = [
  _hoisted_218,
  _hoisted_318,
  _hoisted_46
];
function _sfc_render18(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_118, _hoisted_52);
}
var bell_default = export_helper_default(bell_vue_vue_type_script_lang_default, [["render", _sfc_render18], ["__file", "bell.vue"]]);
var bicycle_vue_vue_type_script_lang_default = {
  name: "Bicycle"
};
var _hoisted_119 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_219 = createStaticVNode('<path fill="currentColor" d="M256 832a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"></path><path fill="currentColor" d="M288 672h320q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"></path><path fill="currentColor" d="M768 832a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"></path><path fill="currentColor" d="M480 192a32 32 0 0 1 0-64h160a32 32 0 0 1 31.04 24.256l96 384a32 32 0 0 1-62.08 15.488L615.04 192H480zM96 384a32 32 0 0 1 0-64h128a32 32 0 0 1 30.336 21.888l64 192a32 32 0 1 1-60.672 20.224L200.96 384H96z"></path><path fill="currentColor" d="m373.376 599.808-42.752-47.616 320-288 42.752 47.616z"></path>', 5);
var _hoisted_7 = [
  _hoisted_219
];
function _sfc_render19(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_119, _hoisted_7);
}
var bicycle_default = export_helper_default(bicycle_vue_vue_type_script_lang_default, [["render", _sfc_render19], ["__file", "bicycle.vue"]]);
var bottom_left_vue_vue_type_script_lang_default = {
  name: "BottomLeft"
};
var _hoisted_120 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_220 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 768h416a32 32 0 1 1 0 64H224a32 32 0 0 1-32-32V352a32 32 0 0 1 64 0v416z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_319 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M246.656 822.656a32 32 0 0 1-45.312-45.312l544-544a32 32 0 0 1 45.312 45.312l-544 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_47 = [
  _hoisted_220,
  _hoisted_319
];
function _sfc_render20(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_120, _hoisted_47);
}
var bottom_left_default = export_helper_default(bottom_left_vue_vue_type_script_lang_default, [["render", _sfc_render20], ["__file", "bottom-left.vue"]]);
var bottom_right_vue_vue_type_script_lang_default = {
  name: "BottomRight"
};
var _hoisted_121 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_221 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 768a32 32 0 1 0 0 64h448a32 32 0 0 0 32-32V352a32 32 0 0 0-64 0v416H352z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_320 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M777.344 822.656a32 32 0 0 0 45.312-45.312l-544-544a32 32 0 0 0-45.312 45.312l544 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_48 = [
  _hoisted_221,
  _hoisted_320
];
function _sfc_render21(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_121, _hoisted_48);
}
var bottom_right_default = export_helper_default(bottom_right_vue_vue_type_script_lang_default, [["render", _sfc_render21], ["__file", "bottom-right.vue"]]);
var bottom_vue_vue_type_script_lang_default = {
  name: "Bottom"
};
var _hoisted_122 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_222 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_321 = [
  _hoisted_222
];
function _sfc_render22(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_122, _hoisted_321);
}
var bottom_default = export_helper_default(bottom_vue_vue_type_script_lang_default, [["render", _sfc_render22], ["__file", "bottom.vue"]]);
var bowl_vue_vue_type_script_lang_default = {
  name: "Bowl"
};
var _hoisted_123 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_223 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M714.432 704a351.744 351.744 0 0 0 148.16-256H161.408a351.744 351.744 0 0 0 148.16 256h404.864zM288 766.592A415.68 415.68 0 0 1 96 416a32 32 0 0 1 32-32h768a32 32 0 0 1 32 32 415.68 415.68 0 0 1-192 350.592V832a64 64 0 0 1-64 64H352a64 64 0 0 1-64-64v-65.408zM493.248 320h-90.496l254.4-254.4a32 32 0 1 1 45.248 45.248L493.248 320zm187.328 0h-128l269.696-155.712a32 32 0 0 1 32 55.424L680.576 320zM352 768v64h320v-64H352z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_322 = [
  _hoisted_223
];
function _sfc_render23(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_123, _hoisted_322);
}
var bowl_default = export_helper_default(bowl_vue_vue_type_script_lang_default, [["render", _sfc_render23], ["__file", "bowl.vue"]]);
var box_vue_vue_type_script_lang_default = {
  name: "Box"
};
var _hoisted_124 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_224 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M317.056 128 128 344.064V896h768V344.064L706.944 128H317.056zm-14.528-64h418.944a32 32 0 0 1 24.064 10.88l206.528 236.096A32 32 0 0 1 960 332.032V928a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V332.032a32 32 0 0 1 7.936-21.12L278.4 75.008A32 32 0 0 1 302.528 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_323 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M64 320h896v64H64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_49 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 327.872V640h128V327.872L526.08 128h-28.16L448 327.872zM448 64h128l64 256v352a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V320l64-256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_53 = [
  _hoisted_224,
  _hoisted_323,
  _hoisted_49
];
function _sfc_render24(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_124, _hoisted_53);
}
var box_default = export_helper_default(box_vue_vue_type_script_lang_default, [["render", _sfc_render24], ["__file", "box.vue"]]);
var briefcase_vue_vue_type_script_lang_default = {
  name: "Briefcase"
};
var _hoisted_125 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_225 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M320 320V128h384v192h192v192H128V320h192zM128 576h768v320H128V576zm256-256h256.064V192H384v128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_324 = [
  _hoisted_225
];
function _sfc_render25(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_125, _hoisted_324);
}
var briefcase_default = export_helper_default(briefcase_vue_vue_type_script_lang_default, [["render", _sfc_render25], ["__file", "briefcase.vue"]]);
var brush_filled_vue_vue_type_script_lang_default = {
  name: "BrushFilled"
};
var _hoisted_126 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_226 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M608 704v160a96 96 0 0 1-192 0V704h-96a128 128 0 0 1-128-128h640a128 128 0 0 1-128 128h-96zM192 512V128.064h640V512H192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_325 = [
  _hoisted_226
];
function _sfc_render26(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_126, _hoisted_325);
}
var brush_filled_default = export_helper_default(brush_filled_vue_vue_type_script_lang_default, [["render", _sfc_render26], ["__file", "brush-filled.vue"]]);
var brush_vue_vue_type_script_lang_default = {
  name: "Brush"
};
var _hoisted_127 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_227 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M896 448H128v192a64 64 0 0 0 64 64h192v192h256V704h192a64 64 0 0 0 64-64V448zm-770.752-64c0-47.552 5.248-90.24 15.552-128 14.72-54.016 42.496-107.392 83.2-160h417.28l-15.36 70.336L736 96h211.2c-24.832 42.88-41.92 96.256-51.2 160a663.872 663.872 0 0 0-6.144 128H960v256a128 128 0 0 1-128 128H704v160a32 32 0 0 1-32 32H352a32 32 0 0 1-32-32V768H192A128 128 0 0 1 64 640V384h61.248zm64 0h636.544c-2.048-45.824.256-91.584 6.848-137.216 4.48-30.848 10.688-59.776 18.688-86.784h-96.64l-221.12 141.248L561.92 160H256.512c-25.856 37.888-43.776 75.456-53.952 112.832-8.768 32.064-13.248 69.12-13.312 111.168z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_326 = [
  _hoisted_227
];
function _sfc_render27(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_127, _hoisted_326);
}
var brush_default = export_helper_default(brush_vue_vue_type_script_lang_default, [["render", _sfc_render27], ["__file", "brush.vue"]]);
var burger_vue_vue_type_script_lang_default = {
  name: "Burger"
};
var _hoisted_128 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_228 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 512a32 32 0 0 0-32 32v64a32 32 0 0 0 30.08 32H864a32 32 0 0 0 32-32v-64a32 32 0 0 0-32-32H160zm736-58.56A96 96 0 0 1 960 544v64a96 96 0 0 1-51.968 85.312L855.36 833.6a96 96 0 0 1-89.856 62.272H258.496A96 96 0 0 1 168.64 833.6l-52.608-140.224A96 96 0 0 1 64 608v-64a96 96 0 0 1 64-90.56V448a384 384 0 1 1 768 5.44zM832 448a320 320 0 0 0-640 0h640zM512 704H188.352l40.192 107.136a32 32 0 0 0 29.952 20.736h507.008a32 32 0 0 0 29.952-20.736L835.648 704H512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_327 = [
  _hoisted_228
];
function _sfc_render28(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_128, _hoisted_327);
}
var burger_default = export_helper_default(burger_vue_vue_type_script_lang_default, [["render", _sfc_render28], ["__file", "burger.vue"]]);
var calendar_vue_vue_type_script_lang_default = {
  name: "Calendar"
};
var _hoisted_129 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_229 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_328 = [
  _hoisted_229
];
function _sfc_render29(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_129, _hoisted_328);
}
var calendar_default = export_helper_default(calendar_vue_vue_type_script_lang_default, [["render", _sfc_render29], ["__file", "calendar.vue"]]);
var camera_filled_vue_vue_type_script_lang_default = {
  name: "CameraFilled"
};
var _hoisted_130 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_230 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 224a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V288a64 64 0 0 0-64-64H748.416l-46.464-92.672A64 64 0 0 0 644.736 96H379.328a64 64 0 0 0-57.216 35.392L275.776 224H160zm352 435.2a115.2 115.2 0 1 0 0-230.4 115.2 115.2 0 0 0 0 230.4zm0 140.8a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_329 = [
  _hoisted_230
];
function _sfc_render30(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_130, _hoisted_329);
}
var camera_filled_default = export_helper_default(camera_filled_vue_vue_type_script_lang_default, [["render", _sfc_render30], ["__file", "camera-filled.vue"]]);
var camera_vue_vue_type_script_lang_default = {
  name: "Camera"
};
var _hoisted_131 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_231 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M896 256H128v576h768V256zm-199.424-64-32.064-64h-304.96l-32 64h369.024zM96 192h160l46.336-92.608A64 64 0 0 1 359.552 64h304.96a64 64 0 0 1 57.216 35.328L768.192 192H928a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32zm416 512a160 160 0 1 0 0-320 160 160 0 0 0 0 320zm0 64a224 224 0 1 1 0-448 224 224 0 0 1 0 448z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_330 = [
  _hoisted_231
];
function _sfc_render31(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_131, _hoisted_330);
}
var camera_default = export_helper_default(camera_vue_vue_type_script_lang_default, [["render", _sfc_render31], ["__file", "camera.vue"]]);
var caret_bottom_vue_vue_type_script_lang_default = {
  name: "CaretBottom"
};
var _hoisted_132 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_232 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m192 384 320 384 320-384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_331 = [
  _hoisted_232
];
function _sfc_render32(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_132, _hoisted_331);
}
var caret_bottom_default = export_helper_default(caret_bottom_vue_vue_type_script_lang_default, [["render", _sfc_render32], ["__file", "caret-bottom.vue"]]);
var caret_left_vue_vue_type_script_lang_default = {
  name: "CaretLeft"
};
var _hoisted_133 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_233 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M672 192 288 511.936 672 832z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_332 = [
  _hoisted_233
];
function _sfc_render33(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_133, _hoisted_332);
}
var caret_left_default = export_helper_default(caret_left_vue_vue_type_script_lang_default, [["render", _sfc_render33], ["__file", "caret-left.vue"]]);
var caret_right_vue_vue_type_script_lang_default = {
  name: "CaretRight"
};
var _hoisted_134 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_234 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 192v640l384-320.064z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_333 = [
  _hoisted_234
];
function _sfc_render34(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_134, _hoisted_333);
}
var caret_right_default = export_helper_default(caret_right_vue_vue_type_script_lang_default, [["render", _sfc_render34], ["__file", "caret-right.vue"]]);
var caret_top_vue_vue_type_script_lang_default = {
  name: "CaretTop"
};
var _hoisted_135 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_235 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 320 192 704h639.936z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_334 = [
  _hoisted_235
];
function _sfc_render35(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_135, _hoisted_334);
}
var caret_top_default = export_helper_default(caret_top_vue_vue_type_script_lang_default, [["render", _sfc_render35], ["__file", "caret-top.vue"]]);
var cellphone_vue_vue_type_script_lang_default = {
  name: "Cellphone"
};
var _hoisted_136 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_236 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H256zm0-64h512a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V192A128 128 0 0 1 256 64zm128 128h256a32 32 0 1 1 0 64H384a32 32 0 0 1 0-64zm128 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_335 = [
  _hoisted_236
];
function _sfc_render36(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_136, _hoisted_335);
}
var cellphone_default = export_helper_default(cellphone_vue_vue_type_script_lang_default, [["render", _sfc_render36], ["__file", "cellphone.vue"]]);
var chat_dot_round_vue_vue_type_script_lang_default = {
  name: "ChatDotRound"
};
var _hoisted_137 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_237 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_336 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_410 = [
  _hoisted_237,
  _hoisted_336
];
function _sfc_render37(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_137, _hoisted_410);
}
var chat_dot_round_default = export_helper_default(chat_dot_round_vue_vue_type_script_lang_default, [["render", _sfc_render37], ["__file", "chat-dot-round.vue"]]);
var chat_dot_square_vue_vue_type_script_lang_default = {
  name: "ChatDotSquare"
};
var _hoisted_138 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_238 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_337 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_411 = [
  _hoisted_238,
  _hoisted_337
];
function _sfc_render38(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_138, _hoisted_411);
}
var chat_dot_square_default = export_helper_default(chat_dot_square_vue_vue_type_script_lang_default, [["render", _sfc_render38], ["__file", "chat-dot-square.vue"]]);
var chat_line_round_vue_vue_type_script_lang_default = {
  name: "ChatLineRound"
};
var _hoisted_139 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_239 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_338 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 576h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm32-192h256q32 0 32 32t-32 32H384q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_412 = [
  _hoisted_239,
  _hoisted_338
];
function _sfc_render39(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_139, _hoisted_412);
}
var chat_line_round_default = export_helper_default(chat_line_round_vue_vue_type_script_lang_default, [["render", _sfc_render39], ["__file", "chat-line-round.vue"]]);
var chat_line_square_vue_vue_type_script_lang_default = {
  name: "ChatLineSquare"
};
var _hoisted_140 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_240 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 826.88 273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_339 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm0-192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_413 = [
  _hoisted_240,
  _hoisted_339
];
function _sfc_render40(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_140, _hoisted_413);
}
var chat_line_square_default = export_helper_default(chat_line_square_vue_vue_type_script_lang_default, [["render", _sfc_render40], ["__file", "chat-line-square.vue"]]);
var chat_round_vue_vue_type_script_lang_default = {
  name: "ChatRound"
};
var _hoisted_141 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_241 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m174.72 855.68 130.048-43.392 23.424 11.392C382.4 849.984 444.352 864 512 864c223.744 0 384-159.872 384-352 0-192.832-159.104-352-384-352S128 319.168 128 512a341.12 341.12 0 0 0 69.248 204.288l21.632 28.8-44.16 110.528zm-45.248 82.56A32 32 0 0 1 89.6 896l56.512-141.248A405.12 405.12 0 0 1 64 512C64 299.904 235.648 96 512 96s448 203.904 448 416-173.44 416-448 416c-79.68 0-150.848-17.152-211.712-46.72l-170.88 56.96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_340 = [
  _hoisted_241
];
function _sfc_render41(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_141, _hoisted_340);
}
var chat_round_default = export_helper_default(chat_round_vue_vue_type_script_lang_default, [["render", _sfc_render41], ["__file", "chat-round.vue"]]);
var chat_square_vue_vue_type_script_lang_default = {
  name: "ChatSquare"
};
var _hoisted_142 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_242 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_341 = [
  _hoisted_242
];
function _sfc_render42(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_142, _hoisted_341);
}
var chat_square_default = export_helper_default(chat_square_vue_vue_type_script_lang_default, [["render", _sfc_render42], ["__file", "chat-square.vue"]]);
var check_vue_vue_type_script_lang_default = {
  name: "Check"
};
var _hoisted_143 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_243 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_342 = [
  _hoisted_243
];
function _sfc_render43(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_143, _hoisted_342);
}
var check_default = export_helper_default(check_vue_vue_type_script_lang_default, [["render", _sfc_render43], ["__file", "check.vue"]]);
var checked_vue_vue_type_script_lang_default = {
  name: "Checked"
};
var _hoisted_144 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_244 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 192h160v736H160V192h160.064v64H704v-64zM311.616 537.28l-45.312 45.248L447.36 763.52l316.8-316.8-45.312-45.184L447.36 673.024 311.616 537.28zM384 192V96h256v96H384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_343 = [
  _hoisted_244
];
function _sfc_render44(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_144, _hoisted_343);
}
var checked_default = export_helper_default(checked_vue_vue_type_script_lang_default, [["render", _sfc_render44], ["__file", "checked.vue"]]);
var cherry_vue_vue_type_script_lang_default = {
  name: "Cherry"
};
var _hoisted_145 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_245 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M261.056 449.6c13.824-69.696 34.88-128.96 63.36-177.728 23.744-40.832 61.12-88.64 112.256-143.872H320a32 32 0 0 1 0-64h384a32 32 0 1 1 0 64H554.752c14.912 39.168 41.344 86.592 79.552 141.76 47.36 68.48 84.8 106.752 106.304 114.304a224 224 0 1 1-84.992 14.784c-22.656-22.912-47.04-53.76-73.92-92.608-38.848-56.128-67.008-105.792-84.352-149.312-55.296 58.24-94.528 107.52-117.76 147.2-23.168 39.744-41.088 88.768-53.568 147.072a224.064 224.064 0 1 1-64.96-1.6zM288 832a160 160 0 1 0 0-320 160 160 0 0 0 0 320zm448-64a160 160 0 1 0 0-320 160 160 0 0 0 0 320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_344 = [
  _hoisted_245
];
function _sfc_render45(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_145, _hoisted_344);
}
var cherry_default = export_helper_default(cherry_vue_vue_type_script_lang_default, [["render", _sfc_render45], ["__file", "cherry.vue"]]);
var chicken_vue_vue_type_script_lang_default = {
  name: "Chicken"
};
var _hoisted_146 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_246 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M349.952 716.992 478.72 588.16a106.688 106.688 0 0 1-26.176-19.072 106.688 106.688 0 0 1-19.072-26.176L304.704 671.744c.768 3.072 1.472 6.144 2.048 9.216l2.048 31.936 31.872 1.984c3.136.64 6.208 1.28 9.28 2.112zm57.344 33.152a128 128 0 1 1-216.32 114.432l-1.92-32-32-1.92a128 128 0 1 1 114.432-216.32L416.64 469.248c-2.432-101.44 58.112-239.104 149.056-330.048 107.328-107.328 231.296-85.504 316.8 0 85.44 85.44 107.328 209.408 0 316.8-91.008 90.88-228.672 151.424-330.112 149.056L407.296 750.08zm90.496-226.304c49.536 49.536 233.344-7.04 339.392-113.088 78.208-78.208 63.232-163.072 0-226.304-63.168-63.232-148.032-78.208-226.24 0C504.896 290.496 448.32 474.368 497.792 523.84zM244.864 708.928a64 64 0 1 0-59.84 59.84l56.32-3.52 3.52-56.32zm8.064 127.68a64 64 0 1 0 59.84-59.84l-56.32 3.52-3.52 56.32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_345 = [
  _hoisted_246
];
function _sfc_render46(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_146, _hoisted_345);
}
var chicken_default = export_helper_default(chicken_vue_vue_type_script_lang_default, [["render", _sfc_render46], ["__file", "chicken.vue"]]);
var chrome_filled_vue_vue_type_script_lang_default = {
  name: "ChromeFilled"
};
var _hoisted_147 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_247 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M938.67 512.01c0-44.59-6.82-87.6-19.54-128H682.67a212.372 212.372 0 0 1 42.67 128c.06 38.71-10.45 76.7-30.42 109.87l-182.91 316.8c235.65-.01 426.66-191.02 426.66-426.67z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_346 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M576.79 401.63a127.92 127.92 0 0 0-63.56-17.6c-22.36-.22-44.39 5.43-63.89 16.38s-35.79 26.82-47.25 46.02a128.005 128.005 0 0 0-2.16 127.44l1.24 2.13a127.906 127.906 0 0 0 46.36 46.61 127.907 127.907 0 0 0 63.38 17.44c22.29.2 44.24-5.43 63.68-16.33a127.94 127.94 0 0 0 47.16-45.79v-.01l1.11-1.92a127.984 127.984 0 0 0 .29-127.46 127.957 127.957 0 0 0-46.36-46.91z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_414 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M394.45 333.96A213.336 213.336 0 0 1 512 298.67h369.58A426.503 426.503 0 0 0 512 85.34a425.598 425.598 0 0 0-171.74 35.98 425.644 425.644 0 0 0-142.62 102.22l118.14 204.63a213.397 213.397 0 0 1 78.67-94.21zm117.56 604.72H512zm-97.25-236.73a213.284 213.284 0 0 1-89.54-86.81L142.48 298.6c-36.35 62.81-57.13 135.68-57.13 213.42 0 203.81 142.93 374.22 333.95 416.55h.04l118.19-204.71a213.315 213.315 0 0 1-122.77-21.91z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_54 = [
  _hoisted_247,
  _hoisted_346,
  _hoisted_414
];
function _sfc_render47(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_147, _hoisted_54);
}
var chrome_filled_default = export_helper_default(chrome_filled_vue_vue_type_script_lang_default, [["render", _sfc_render47], ["__file", "chrome-filled.vue"]]);
var circle_check_filled_vue_vue_type_script_lang_default = {
  name: "CircleCheckFilled"
};
var _hoisted_148 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_248 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_347 = [
  _hoisted_248
];
function _sfc_render48(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_148, _hoisted_347);
}
var circle_check_filled_default = export_helper_default(circle_check_filled_vue_vue_type_script_lang_default, [["render", _sfc_render48], ["__file", "circle-check-filled.vue"]]);
var circle_check_vue_vue_type_script_lang_default = {
  name: "CircleCheck"
};
var _hoisted_149 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_249 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_348 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_415 = [
  _hoisted_249,
  _hoisted_348
];
function _sfc_render49(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_149, _hoisted_415);
}
var circle_check_default = export_helper_default(circle_check_vue_vue_type_script_lang_default, [["render", _sfc_render49], ["__file", "circle-check.vue"]]);
var circle_close_filled_vue_vue_type_script_lang_default = {
  name: "CircleCloseFilled"
};
var _hoisted_150 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_250 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_349 = [
  _hoisted_250
];
function _sfc_render50(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_150, _hoisted_349);
}
var circle_close_filled_default = export_helper_default(circle_close_filled_vue_vue_type_script_lang_default, [["render", _sfc_render50], ["__file", "circle-close-filled.vue"]]);
var circle_close_vue_vue_type_script_lang_default = {
  name: "CircleClose"
};
var _hoisted_151 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_251 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_350 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_416 = [
  _hoisted_251,
  _hoisted_350
];
function _sfc_render51(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_151, _hoisted_416);
}
var circle_close_default = export_helper_default(circle_close_vue_vue_type_script_lang_default, [["render", _sfc_render51], ["__file", "circle-close.vue"]]);
var circle_plus_filled_vue_vue_type_script_lang_default = {
  name: "CirclePlusFilled"
};
var _hoisted_152 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_252 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-38.4 409.6H326.4a38.4 38.4 0 1 0 0 76.8h147.2v147.2a38.4 38.4 0 0 0 76.8 0V550.4h147.2a38.4 38.4 0 0 0 0-76.8H550.4V326.4a38.4 38.4 0 1 0-76.8 0v147.2z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_351 = [
  _hoisted_252
];
function _sfc_render52(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_152, _hoisted_351);
}
var circle_plus_filled_default = export_helper_default(circle_plus_filled_vue_vue_type_script_lang_default, [["render", _sfc_render52], ["__file", "circle-plus-filled.vue"]]);
var circle_plus_vue_vue_type_script_lang_default = {
  name: "CirclePlus"
};
var _hoisted_153 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_253 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_352 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_417 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_55 = [
  _hoisted_253,
  _hoisted_352,
  _hoisted_417
];
function _sfc_render53(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_153, _hoisted_55);
}
var circle_plus_default = export_helper_default(circle_plus_vue_vue_type_script_lang_default, [["render", _sfc_render53], ["__file", "circle-plus.vue"]]);
var clock_vue_vue_type_script_lang_default = {
  name: "Clock"
};
var _hoisted_154 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_254 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_353 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_418 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_56 = [
  _hoisted_254,
  _hoisted_353,
  _hoisted_418
];
function _sfc_render54(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_154, _hoisted_56);
}
var clock_default = export_helper_default(clock_vue_vue_type_script_lang_default, [["render", _sfc_render54], ["__file", "clock.vue"]]);
var close_bold_vue_vue_type_script_lang_default = {
  name: "CloseBold"
};
var _hoisted_155 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_255 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_354 = [
  _hoisted_255
];
function _sfc_render55(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_155, _hoisted_354);
}
var close_bold_default = export_helper_default(close_bold_vue_vue_type_script_lang_default, [["render", _sfc_render55], ["__file", "close-bold.vue"]]);
var close_vue_vue_type_script_lang_default = {
  name: "Close"
};
var _hoisted_156 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_256 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_355 = [
  _hoisted_256
];
function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
}
var close_default = export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]);
var cloudy_vue_vue_type_script_lang_default = {
  name: "Cloudy"
};
var _hoisted_157 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_257 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M598.4 831.872H328.192a256 256 0 0 1-34.496-510.528A352 352 0 1 1 598.4 831.872zm-271.36-64h272.256a288 288 0 1 0-248.512-417.664L335.04 381.44l-34.816 3.584a192 192 0 0 0 26.88 382.848z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_356 = [
  _hoisted_257
];
function _sfc_render57(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_157, _hoisted_356);
}
var cloudy_default = export_helper_default(cloudy_vue_vue_type_script_lang_default, [["render", _sfc_render57], ["__file", "cloudy.vue"]]);
var coffee_cup_vue_vue_type_script_lang_default = {
  name: "CoffeeCup"
};
var _hoisted_158 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_258 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 192a192 192 0 1 1-8 383.808A256.128 256.128 0 0 1 512 768H320A256 256 0 0 1 64 512V160a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v32zm0 64v256a128 128 0 1 0 0-256zM96 832h640a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64zm32-640v320a192 192 0 0 0 192 192h192a192 192 0 0 0 192-192V192H128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_357 = [
  _hoisted_258
];
function _sfc_render58(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_158, _hoisted_357);
}
var coffee_cup_default = export_helper_default(coffee_cup_vue_vue_type_script_lang_default, [["render", _sfc_render58], ["__file", "coffee-cup.vue"]]);
var coffee_vue_vue_type_script_lang_default = {
  name: "Coffee"
};
var _hoisted_159 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_259 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M822.592 192h14.272a32 32 0 0 1 31.616 26.752l21.312 128A32 32 0 0 1 858.24 384h-49.344l-39.04 546.304A32 32 0 0 1 737.92 960H285.824a32 32 0 0 1-32-29.696L214.912 384H165.76a32 32 0 0 1-31.552-37.248l21.312-128A32 32 0 0 1 187.136 192h14.016l-6.72-93.696A32 32 0 0 1 226.368 64h571.008a32 32 0 0 1 31.936 34.304L822.592 192zm-64.128 0 4.544-64H260.736l4.544 64h493.184zm-548.16 128H820.48l-10.688-64H214.208l-10.688 64h6.784zm68.736 64 36.544 512H708.16l36.544-512H279.04z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_358 = [
  _hoisted_259
];
function _sfc_render59(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_159, _hoisted_358);
}
var coffee_default = export_helper_default(coffee_vue_vue_type_script_lang_default, [["render", _sfc_render59], ["__file", "coffee.vue"]]);
var coin_vue_vue_type_script_lang_default = {
  name: "Coin"
};
var _hoisted_160 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_260 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_359 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_419 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224zm0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_57 = [
  _hoisted_260,
  _hoisted_359,
  _hoisted_419
];
function _sfc_render60(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_160, _hoisted_57);
}
var coin_default = export_helper_default(coin_vue_vue_type_script_lang_default, [["render", _sfc_render60], ["__file", "coin.vue"]]);
var cold_drink_vue_vue_type_script_lang_default = {
  name: "ColdDrink"
};
var _hoisted_161 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_261 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 64a192 192 0 1 1-69.952 370.88L480 725.376V896h96a32 32 0 1 1 0 64H320a32 32 0 1 1 0-64h96V725.376L76.8 273.536a64 64 0 0 1-12.8-38.4v-10.688a32 32 0 0 1 32-32h71.808l-65.536-83.84a32 32 0 0 1 50.432-39.424l96.256 123.264h337.728A192.064 192.064 0 0 1 768 64zM656.896 192.448H800a32 32 0 0 1 32 32v10.624a64 64 0 0 1-12.8 38.4l-80.448 107.2a128 128 0 1 0-81.92-188.16v-.064zm-357.888 64 129.472 165.76a32 32 0 0 1-50.432 39.36l-160.256-205.12H144l304 404.928 304-404.928H299.008z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_360 = [
  _hoisted_261
];
function _sfc_render61(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_161, _hoisted_360);
}
var cold_drink_default = export_helper_default(cold_drink_vue_vue_type_script_lang_default, [["render", _sfc_render61], ["__file", "cold-drink.vue"]]);
var collection_tag_vue_vue_type_script_lang_default = {
  name: "CollectionTag"
};
var _hoisted_162 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_262 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_361 = [
  _hoisted_262
];
function _sfc_render62(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_162, _hoisted_361);
}
var collection_tag_default = export_helper_default(collection_tag_vue_vue_type_script_lang_default, [["render", _sfc_render62], ["__file", "collection-tag.vue"]]);
var collection_vue_vue_type_script_lang_default = {
  name: "Collection"
};
var _hoisted_163 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_263 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 736h640V128H256a64 64 0 0 0-64 64v544zm64-672h608a32 32 0 0 1 32 32v672a32 32 0 0 1-32 32H160l-32 57.536V192A128 128 0 0 1 256 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_362 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M240 800a48 48 0 1 0 0 96h592v-96H240zm0-64h656v160a64 64 0 0 1-64 64H240a112 112 0 0 1 0-224zm144-608v250.88l96-76.8 96 76.8V128H384zm-64-64h320v381.44a32 32 0 0 1-51.968 24.96L480 384l-108.032 86.4A32 32 0 0 1 320 445.44V64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_420 = [
  _hoisted_263,
  _hoisted_362
];
function _sfc_render63(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_163, _hoisted_420);
}
var collection_default = export_helper_default(collection_vue_vue_type_script_lang_default, [["render", _sfc_render63], ["__file", "collection.vue"]]);
var comment_vue_vue_type_script_lang_default = {
  name: "Comment"
};
var _hoisted_164 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_264 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M736 504a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zM128 128v640h192v160l224-160h352V128H128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_363 = [
  _hoisted_264
];
function _sfc_render64(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_164, _hoisted_363);
}
var comment_default = export_helper_default(comment_vue_vue_type_script_lang_default, [["render", _sfc_render64], ["__file", "comment.vue"]]);
var compass_vue_vue_type_script_lang_default = {
  name: "Compass"
};
var _hoisted_165 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_265 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_364 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M725.888 315.008C676.48 428.672 624 513.28 568.576 568.64c-55.424 55.424-139.968 107.904-253.568 157.312a12.8 12.8 0 0 1-16.896-16.832c49.536-113.728 102.016-198.272 157.312-253.632 55.36-55.296 139.904-107.776 253.632-157.312a12.8 12.8 0 0 1 16.832 16.832z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_421 = [
  _hoisted_265,
  _hoisted_364
];
function _sfc_render65(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_165, _hoisted_421);
}
var compass_default = export_helper_default(compass_vue_vue_type_script_lang_default, [["render", _sfc_render65], ["__file", "compass.vue"]]);
var connection_vue_vue_type_script_lang_default = {
  name: "Connection"
};
var _hoisted_166 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_266 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192h192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_365 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.064 192.064 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192H384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_422 = [
  _hoisted_266,
  _hoisted_365
];
function _sfc_render66(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_166, _hoisted_422);
}
var connection_default = export_helper_default(connection_vue_vue_type_script_lang_default, [["render", _sfc_render66], ["__file", "connection.vue"]]);
var coordinate_vue_vue_type_script_lang_default = {
  name: "Coordinate"
};
var _hoisted_167 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_267 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 512h64v320h-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_366 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 896h640a64 64 0 0 0-64-64H256a64 64 0 0 0-64 64zm64-128h512a128 128 0 0 1 128 128v64H128v-64a128 128 0 0 1 128-128zm256-256a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_423 = [
  _hoisted_267,
  _hoisted_366
];
function _sfc_render67(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_167, _hoisted_423);
}
var coordinate_default = export_helper_default(coordinate_vue_vue_type_script_lang_default, [["render", _sfc_render67], ["__file", "coordinate.vue"]]);
var copy_document_vue_vue_type_script_lang_default = {
  name: "CopyDocument"
};
var _hoisted_168 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_268 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_367 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_424 = [
  _hoisted_268,
  _hoisted_367
];
function _sfc_render68(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_168, _hoisted_424);
}
var copy_document_default = export_helper_default(copy_document_vue_vue_type_script_lang_default, [["render", _sfc_render68], ["__file", "copy-document.vue"]]);
var cpu_vue_vue_type_script_lang_default = {
  name: "Cpu"
};
var _hoisted_169 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_269 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M320 256a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64H320zm0-64h384a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H320a128 128 0 0 1-128-128V320a128 128 0 0 1 128-128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_368 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm-320 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 896a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm160 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm-320 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zM64 512a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0-160a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0 320a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm896-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0 320a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_425 = [
  _hoisted_269,
  _hoisted_368
];
function _sfc_render69(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_169, _hoisted_425);
}
var cpu_default = export_helper_default(cpu_vue_vue_type_script_lang_default, [["render", _sfc_render69], ["__file", "cpu.vue"]]);
var credit_card_vue_vue_type_script_lang_default = {
  name: "CreditCard"
};
var _hoisted_170 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_270 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M896 324.096c0-42.368-2.496-55.296-9.536-68.48a52.352 52.352 0 0 0-22.144-22.08c-13.12-7.04-26.048-9.536-68.416-9.536H228.096c-42.368 0-55.296 2.496-68.48 9.536a52.352 52.352 0 0 0-22.08 22.144c-7.04 13.12-9.536 26.048-9.536 68.416v375.808c0 42.368 2.496 55.296 9.536 68.48a52.352 52.352 0 0 0 22.144 22.08c13.12 7.04 26.048 9.536 68.416 9.536h567.808c42.368 0 55.296-2.496 68.48-9.536a52.352 52.352 0 0 0 22.08-22.144c7.04-13.12 9.536-26.048 9.536-68.416V324.096zm64 0v375.808c0 57.088-5.952 77.76-17.088 98.56-11.136 20.928-27.52 37.312-48.384 48.448-20.864 11.136-41.6 17.088-98.56 17.088H228.032c-57.088 0-77.76-5.952-98.56-17.088a116.288 116.288 0 0 1-48.448-48.384c-11.136-20.864-17.088-41.6-17.088-98.56V324.032c0-57.088 5.952-77.76 17.088-98.56 11.136-20.928 27.52-37.312 48.384-48.448 20.864-11.136 41.6-17.088 98.56-17.088H795.84c57.088 0 77.76 5.952 98.56 17.088 20.928 11.136 37.312 27.52 48.448 48.384 11.136 20.864 17.088 41.6 17.088 98.56z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_369 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M64 320h896v64H64v-64zm0 128h896v64H64v-64zm128 192h256v64H192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_426 = [
  _hoisted_270,
  _hoisted_369
];
function _sfc_render70(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_170, _hoisted_426);
}
var credit_card_default = export_helper_default(credit_card_vue_vue_type_script_lang_default, [["render", _sfc_render70], ["__file", "credit-card.vue"]]);
var crop_vue_vue_type_script_lang_default = {
  name: "Crop"
};
var _hoisted_171 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_271 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 768h672a32 32 0 1 1 0 64H224a32 32 0 0 1-32-32V96a32 32 0 0 1 64 0v672z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_370 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 224v704a32 32 0 1 1-64 0V256H96a32 32 0 0 1 0-64h704a32 32 0 0 1 32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_427 = [
  _hoisted_271,
  _hoisted_370
];
function _sfc_render71(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_171, _hoisted_427);
}
var crop_default = export_helper_default(crop_vue_vue_type_script_lang_default, [["render", _sfc_render71], ["__file", "crop.vue"]]);
var d_arrow_left_vue_vue_type_script_lang_default = {
  name: "DArrowLeft"
};
var _hoisted_172 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_272 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_371 = [
  _hoisted_272
];
function _sfc_render72(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_172, _hoisted_371);
}
var d_arrow_left_default = export_helper_default(d_arrow_left_vue_vue_type_script_lang_default, [["render", _sfc_render72], ["__file", "d-arrow-left.vue"]]);
var d_arrow_right_vue_vue_type_script_lang_default = {
  name: "DArrowRight"
};
var _hoisted_173 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_273 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_372 = [
  _hoisted_273
];
function _sfc_render73(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_173, _hoisted_372);
}
var d_arrow_right_default = export_helper_default(d_arrow_right_vue_vue_type_script_lang_default, [["render", _sfc_render73], ["__file", "d-arrow-right.vue"]]);
var d_caret_vue_vue_type_script_lang_default = {
  name: "DCaret"
};
var _hoisted_174 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_274 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m512 128 288 320H224l288-320zM224 576h576L512 896 224 576z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_373 = [
  _hoisted_274
];
function _sfc_render74(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_174, _hoisted_373);
}
var d_caret_default = export_helper_default(d_caret_vue_vue_type_script_lang_default, [["render", _sfc_render74], ["__file", "d-caret.vue"]]);
var data_analysis_vue_vue_type_script_lang_default = {
  name: "DataAnalysis"
};
var _hoisted_175 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_275 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m665.216 768 110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216zM832 192H192v512h640V192zM352 448a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0V416a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_374 = [
  _hoisted_275
];
function _sfc_render75(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_175, _hoisted_374);
}
var data_analysis_default = export_helper_default(data_analysis_vue_vue_type_script_lang_default, [["render", _sfc_render75], ["__file", "data-analysis.vue"]]);
var data_board_vue_vue_type_script_lang_default = {
  name: "DataBoard"
};
var _hoisted_176 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_276 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M32 128h960v64H32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_375 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 192v512h640V192H192zm-64-64h768v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_428 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M322.176 960H248.32l144.64-250.56 55.424 32L322.176 960zm453.888 0h-73.856L576 741.44l55.424-32L776.064 960z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_58 = [
  _hoisted_276,
  _hoisted_375,
  _hoisted_428
];
function _sfc_render76(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_176, _hoisted_58);
}
var data_board_default = export_helper_default(data_board_vue_vue_type_script_lang_default, [["render", _sfc_render76], ["__file", "data-board.vue"]]);
var data_line_vue_vue_type_script_lang_default = {
  name: "DataLine"
};
var _hoisted_177 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_277 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M359.168 768H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216l110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192zM832 192H192v512h640V192zM342.656 534.656a32 32 0 1 1-45.312-45.312L444.992 341.76l125.44 94.08L679.04 300.032a32 32 0 1 1 49.92 39.936L581.632 524.224 451.008 426.24 342.656 534.592z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_376 = [
  _hoisted_277
];
function _sfc_render77(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_177, _hoisted_376);
}
var data_line_default = export_helper_default(data_line_vue_vue_type_script_lang_default, [["render", _sfc_render77], ["__file", "data-line.vue"]]);
var delete_filled_vue_vue_type_script_lang_default = {
  name: "DeleteFilled"
};
var _hoisted_178 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_278 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_377 = [
  _hoisted_278
];
function _sfc_render78(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_178, _hoisted_377);
}
var delete_filled_default = export_helper_default(delete_filled_vue_vue_type_script_lang_default, [["render", _sfc_render78], ["__file", "delete-filled.vue"]]);
var delete_location_vue_vue_type_script_lang_default = {
  name: "DeleteLocation"
};
var _hoisted_179 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_279 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_378 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_429 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 384h256q32 0 32 32t-32 32H384q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_59 = [
  _hoisted_279,
  _hoisted_378,
  _hoisted_429
];
function _sfc_render79(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_179, _hoisted_59);
}
var delete_location_default = export_helper_default(delete_location_vue_vue_type_script_lang_default, [["render", _sfc_render79], ["__file", "delete-location.vue"]]);
var delete_vue_vue_type_script_lang_default = {
  name: "Delete"
};
var _hoisted_180 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_280 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_379 = [
  _hoisted_280
];
function _sfc_render80(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_180, _hoisted_379);
}
var delete_default = export_helper_default(delete_vue_vue_type_script_lang_default, [["render", _sfc_render80], ["__file", "delete.vue"]]);
var dessert_vue_vue_type_script_lang_default = {
  name: "Dessert"
};
var _hoisted_181 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_281 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 416v-48a144 144 0 0 1 168.64-141.888 224.128 224.128 0 0 1 430.72 0A144 144 0 0 1 896 368v48a384 384 0 0 1-352 382.72V896h-64v-97.28A384 384 0 0 1 128 416zm287.104-32.064h193.792a143.808 143.808 0 0 1 58.88-132.736 160.064 160.064 0 0 0-311.552 0 143.808 143.808 0 0 1 58.88 132.8zm-72.896 0a72 72 0 1 0-140.48 0h140.48zm339.584 0h140.416a72 72 0 1 0-140.48 0zM512 736a320 320 0 0 0 318.4-288.064H193.6A320 320 0 0 0 512 736zM384 896.064h256a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_380 = [
  _hoisted_281
];
function _sfc_render81(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_181, _hoisted_380);
}
var dessert_default = export_helper_default(dessert_vue_vue_type_script_lang_default, [["render", _sfc_render81], ["__file", "dessert.vue"]]);
var discount_vue_vue_type_script_lang_default = {
  name: "Discount"
};
var _hoisted_182 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_282 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 704h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0L224 318.336V704zm0 64v128h576V768H224zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_381 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_430 = [
  _hoisted_282,
  _hoisted_381
];
function _sfc_render82(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_182, _hoisted_430);
}
var discount_default = export_helper_default(discount_vue_vue_type_script_lang_default, [["render", _sfc_render82], ["__file", "discount.vue"]]);
var dish_dot_vue_vue_type_script_lang_default = {
  name: "DishDot"
};
var _hoisted_183 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_283 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m384.064 274.56.064-50.688A128 128 0 0 1 512.128 96c70.528 0 127.68 57.152 127.68 127.68v50.752A448.192 448.192 0 0 1 955.392 768H68.544A448.192 448.192 0 0 1 384 274.56zM96 832h832a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64zm32-128h768a384 384 0 1 0-768 0zm447.808-448v-32.32a63.68 63.68 0 0 0-63.68-63.68 64 64 0 0 0-64 63.936V256h127.68z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_382 = [
  _hoisted_283
];
function _sfc_render83(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_183, _hoisted_382);
}
var dish_dot_default = export_helper_default(dish_dot_vue_vue_type_script_lang_default, [["render", _sfc_render83], ["__file", "dish-dot.vue"]]);
var dish_vue_vue_type_script_lang_default = {
  name: "Dish"
};
var _hoisted_184 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_284 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 257.152V192h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64h-96v65.152A448 448 0 0 1 955.52 768H68.48A448 448 0 0 1 480 257.152zM128 704h768a384 384 0 1 0-768 0zM96 832h832a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_383 = [
  _hoisted_284
];
function _sfc_render84(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_184, _hoisted_383);
}
var dish_default = export_helper_default(dish_vue_vue_type_script_lang_default, [["render", _sfc_render84], ["__file", "dish.vue"]]);
var document_add_vue_vue_type_script_lang_default = {
  name: "DocumentAdd"
};
var _hoisted_185 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_285 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_384 = [
  _hoisted_285
];
function _sfc_render85(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_185, _hoisted_384);
}
var document_add_default = export_helper_default(document_add_vue_vue_type_script_lang_default, [["render", _sfc_render85], ["__file", "document-add.vue"]]);
var document_checked_vue_vue_type_script_lang_default = {
  name: "DocumentChecked"
};
var _hoisted_186 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_286 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm318.4 582.144 180.992-180.992L704.64 510.4 478.4 736.64 320 578.304l45.248-45.312L478.4 646.144z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_385 = [
  _hoisted_286
];
function _sfc_render86(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_186, _hoisted_385);
}
var document_checked_default = export_helper_default(document_checked_vue_vue_type_script_lang_default, [["render", _sfc_render86], ["__file", "document-checked.vue"]]);
var document_copy_vue_vue_type_script_lang_default = {
  name: "DocumentCopy"
};
var _hoisted_187 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_287 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_386 = [
  _hoisted_287
];
function _sfc_render87(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_187, _hoisted_386);
}
var document_copy_default = export_helper_default(document_copy_vue_vue_type_script_lang_default, [["render", _sfc_render87], ["__file", "document-copy.vue"]]);
var document_delete_vue_vue_type_script_lang_default = {
  name: "DocumentDelete"
};
var _hoisted_188 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_288 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm308.992 546.304-90.496-90.624 45.248-45.248 90.56 90.496 90.496-90.432 45.248 45.248-90.496 90.56 90.496 90.496-45.248 45.248-90.496-90.496-90.56 90.496-45.248-45.248 90.496-90.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_387 = [
  _hoisted_288
];
function _sfc_render88(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_188, _hoisted_387);
}
var document_delete_default = export_helper_default(document_delete_vue_vue_type_script_lang_default, [["render", _sfc_render88], ["__file", "document-delete.vue"]]);
var document_remove_vue_vue_type_script_lang_default = {
  name: "DocumentRemove"
};
var _hoisted_189 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_289 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm192 512h320v64H352v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_388 = [
  _hoisted_289
];
function _sfc_render89(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_189, _hoisted_388);
}
var document_remove_default = export_helper_default(document_remove_vue_vue_type_script_lang_default, [["render", _sfc_render89], ["__file", "document-remove.vue"]]);
var document_vue_vue_type_script_lang_default = {
  name: "Document"
};
var _hoisted_190 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_290 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_389 = [
  _hoisted_290
];
function _sfc_render90(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_190, _hoisted_389);
}
var document_default = export_helper_default(document_vue_vue_type_script_lang_default, [["render", _sfc_render90], ["__file", "document.vue"]]);
var download_vue_vue_type_script_lang_default = {
  name: "Download"
};
var _hoisted_191 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_291 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_390 = [
  _hoisted_291
];
function _sfc_render91(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_191, _hoisted_390);
}
var download_default = export_helper_default(download_vue_vue_type_script_lang_default, [["render", _sfc_render91], ["__file", "download.vue"]]);
var drizzling_vue_vue_type_script_lang_default = {
  name: "Drizzling"
};
var _hoisted_192 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_292 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m739.328 291.328-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 97.28 78.72 175.936 175.808 175.936h400a192 192 0 0 0 35.776-380.672zM959.552 480a256 256 0 0 1-256 256h-400A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 959.552 480zM288 800h64v64h-64v-64zm192 0h64v64h-64v-64zm-96 96h64v64h-64v-64zm192 0h64v64h-64v-64zm96-96h64v64h-64v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_391 = [
  _hoisted_292
];
function _sfc_render92(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_192, _hoisted_391);
}
var drizzling_default = export_helper_default(drizzling_vue_vue_type_script_lang_default, [["render", _sfc_render92], ["__file", "drizzling.vue"]]);
var edit_pen_vue_vue_type_script_lang_default = {
  name: "EditPen"
};
var _hoisted_193 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_293 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_392 = [
  _hoisted_293
];
function _sfc_render93(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_193, _hoisted_392);
}
var edit_pen_default = export_helper_default(edit_pen_vue_vue_type_script_lang_default, [["render", _sfc_render93], ["__file", "edit-pen.vue"]]);
var edit_vue_vue_type_script_lang_default = {
  name: "Edit"
};
var _hoisted_194 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_294 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_393 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_431 = [
  _hoisted_294,
  _hoisted_393
];
function _sfc_render94(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_194, _hoisted_431);
}
var edit_default = export_helper_default(edit_vue_vue_type_script_lang_default, [["render", _sfc_render94], ["__file", "edit.vue"]]);
var eleme_filled_vue_vue_type_script_lang_default = {
  name: "ElemeFilled"
};
var _hoisted_195 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_295 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M176 64h672c61.824 0 112 50.176 112 112v672a112 112 0 0 1-112 112H176A112 112 0 0 1 64 848V176c0-61.824 50.176-112 112-112zm150.528 173.568c-152.896 99.968-196.544 304.064-97.408 456.96a330.688 330.688 0 0 0 456.96 96.64c9.216-5.888 17.6-11.776 25.152-18.56a18.24 18.24 0 0 0 4.224-24.32L700.352 724.8a47.552 47.552 0 0 0-65.536-14.272A234.56 234.56 0 0 1 310.592 641.6C240 533.248 271.104 387.968 379.456 316.48a234.304 234.304 0 0 1 276.352 15.168c1.664.832 2.56 2.56 3.392 4.224 5.888 8.384 3.328 19.328-5.12 25.216L456.832 489.6a47.552 47.552 0 0 0-14.336 65.472l16 24.384c5.888 8.384 16.768 10.88 25.216 5.056l308.224-199.936a19.584 19.584 0 0 0 6.72-23.488v-.896c-4.992-9.216-10.048-17.6-15.104-26.88-99.968-151.168-304.064-194.88-456.96-95.744zM786.88 504.704l-62.208 40.32c-8.32 5.888-10.88 16.768-4.992 25.216L760 632.32c5.888 8.448 16.768 11.008 25.152 5.12l31.104-20.16a55.36 55.36 0 0 0 16-76.48l-20.224-31.04a19.52 19.52 0 0 0-25.152-5.12z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_394 = [
  _hoisted_295
];
function _sfc_render95(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_195, _hoisted_394);
}
var eleme_filled_default = export_helper_default(eleme_filled_vue_vue_type_script_lang_default, [["render", _sfc_render95], ["__file", "eleme-filled.vue"]]);
var eleme_vue_vue_type_script_lang_default = {
  name: "Eleme"
};
var _hoisted_196 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_296 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_395 = [
  _hoisted_296
];
function _sfc_render96(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_196, _hoisted_395);
}
var eleme_default = export_helper_default(eleme_vue_vue_type_script_lang_default, [["render", _sfc_render96], ["__file", "eleme.vue"]]);
var element_plus_vue_vue_type_script_lang_default = {
  name: "ElementPlus"
};
var _hoisted_197 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_297 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M839.7 734.7c0 33.3-17.9 41-17.9 41S519.7 949.8 499.2 960c-10.2 5.1-20.5 5.1-30.7 0 0 0-314.9-184.3-325.1-192-5.1-5.1-10.2-12.8-12.8-20.5V368.6c0-17.9 20.5-28.2 20.5-28.2L466 158.6c12.8-5.1 25.6-5.1 38.4 0 0 0 279 161.3 309.8 179.2 17.9 7.7 28.2 25.6 25.6 46.1-.1-5-.1 317.5-.1 350.8zM714.2 371.2c-64-35.8-217.6-125.4-217.6-125.4-7.7-5.1-20.5-5.1-30.7 0L217.6 389.1s-17.9 10.2-17.9 23v297c0 5.1 5.1 12.8 7.7 17.9 7.7 5.1 256 148.5 256 148.5 7.7 5.1 17.9 5.1 25.6 0 15.4-7.7 250.9-145.9 250.9-145.9s12.8-5.1 12.8-30.7v-74.2l-276.5 169v-64c0-17.9 7.7-30.7 20.5-46.1L745 535c5.1-7.7 10.2-20.5 10.2-30.7v-66.6l-279 169v-69.1c0-15.4 5.1-30.7 17.9-38.4l220.1-128zM919 135.7c0-5.1-5.1-7.7-7.7-7.7h-58.9V66.6c0-5.1-5.1-5.1-10.2-5.1l-30.7 5.1c-5.1 0-5.1 2.6-5.1 5.1V128h-56.3c-5.1 0-5.1 5.1-7.7 5.1v38.4h69.1v64c0 5.1 5.1 5.1 10.2 5.1l30.7-5.1c5.1 0 5.1-2.6 5.1-5.1v-56.3h64l-2.5-38.4z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_396 = [
  _hoisted_297
];
function _sfc_render97(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_197, _hoisted_396);
}
var element_plus_default = export_helper_default(element_plus_vue_vue_type_script_lang_default, [["render", _sfc_render97], ["__file", "element-plus.vue"]]);
var expand_vue_vue_type_script_lang_default = {
  name: "Expand"
};
var _hoisted_198 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_298 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_397 = [
  _hoisted_298
];
function _sfc_render98(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_198, _hoisted_397);
}
var expand_default = export_helper_default(expand_vue_vue_type_script_lang_default, [["render", _sfc_render98], ["__file", "expand.vue"]]);
var failed_vue_vue_type_script_lang_default = {
  name: "Failed"
};
var _hoisted_199 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_299 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m557.248 608 135.744-135.744-45.248-45.248-135.68 135.744-135.808-135.68-45.248 45.184L466.752 608l-135.68 135.68 45.184 45.312L512 653.248l135.744 135.744 45.248-45.248L557.312 608zM704 192h160v736H160V192h160v64h384v-64zm-320 0V96h256v96H384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_398 = [
  _hoisted_299
];
function _sfc_render99(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_199, _hoisted_398);
}
var failed_default = export_helper_default(failed_vue_vue_type_script_lang_default, [["render", _sfc_render99], ["__file", "failed.vue"]]);
var female_vue_vue_type_script_lang_default = {
  name: "Female"
};
var _hoisted_1100 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2100 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 640a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_399 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 640q32 0 32 32v256q0 32-32 32t-32-32V672q0-32 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_432 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 800h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_510 = [
  _hoisted_2100,
  _hoisted_399,
  _hoisted_432
];
function _sfc_render100(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1100, _hoisted_510);
}
var female_default = export_helper_default(female_vue_vue_type_script_lang_default, [["render", _sfc_render100], ["__file", "female.vue"]]);
var files_vue_vue_type_script_lang_default = {
  name: "Files"
};
var _hoisted_1101 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2101 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 384v448h768V384H128zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32zm64-128h704v64H160zm96-128h512v64H256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3100 = [
  _hoisted_2101
];
function _sfc_render101(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1101, _hoisted_3100);
}
var files_default = export_helper_default(files_vue_vue_type_script_lang_default, [["render", _sfc_render101], ["__file", "files.vue"]]);
var film_vue_vue_type_script_lang_default = {
  name: "Film"
};
var _hoisted_1102 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2102 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3101 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M320 288V128h64v352h256V128h64v160h160v64H704v128h160v64H704v128h160v64H704v160h-64V544H384v352h-64V736H128v-64h192V544H128v-64h192V352H128v-64h192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_433 = [
  _hoisted_2102,
  _hoisted_3101
];
function _sfc_render102(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1102, _hoisted_433);
}
var film_default = export_helper_default(film_vue_vue_type_script_lang_default, [["render", _sfc_render102], ["__file", "film.vue"]]);
var filter_vue_vue_type_script_lang_default = {
  name: "Filter"
};
var _hoisted_1103 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2103 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 523.392V928a32 32 0 0 0 46.336 28.608l192-96A32 32 0 0 0 640 832V523.392l280.768-343.104a32 32 0 1 0-49.536-40.576l-288 352A32 32 0 0 0 576 512v300.224l-128 64V512a32 32 0 0 0-7.232-20.288L195.52 192H704a32 32 0 1 0 0-64H128a32 32 0 0 0-24.768 52.288L384 523.392z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3102 = [
  _hoisted_2103
];
function _sfc_render103(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1103, _hoisted_3102);
}
var filter_default = export_helper_default(filter_vue_vue_type_script_lang_default, [["render", _sfc_render103], ["__file", "filter.vue"]]);
var finished_vue_vue_type_script_lang_default = {
  name: "Finished"
};
var _hoisted_1104 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2104 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64H736zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64H608zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64H480z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3103 = [
  _hoisted_2104
];
function _sfc_render104(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1104, _hoisted_3103);
}
var finished_default = export_helper_default(finished_vue_vue_type_script_lang_default, [["render", _sfc_render104], ["__file", "finished.vue"]]);
var first_aid_kit_vue_vue_type_script_lang_default = {
  name: "FirstAidKit"
};
var _hoisted_1105 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2105 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 256a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64H192zm0-64h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3104 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 512h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96zM352 128v64h320v-64H352zm-32-64h384a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H320a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_434 = [
  _hoisted_2105,
  _hoisted_3104
];
function _sfc_render105(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1105, _hoisted_434);
}
var first_aid_kit_default = export_helper_default(first_aid_kit_vue_vue_type_script_lang_default, [["render", _sfc_render105], ["__file", "first-aid-kit.vue"]]);
var flag_vue_vue_type_script_lang_default = {
  name: "Flag"
};
var _hoisted_1106 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2106 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 128h608L736 384l160 256H288v320h-96V64h96v64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3105 = [
  _hoisted_2106
];
function _sfc_render106(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1106, _hoisted_3105);
}
var flag_default = export_helper_default(flag_vue_vue_type_script_lang_default, [["render", _sfc_render106], ["__file", "flag.vue"]]);
var fold_vue_vue_type_script_lang_default = {
  name: "Fold"
};
var _hoisted_1107 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2107 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3106 = [
  _hoisted_2107
];
function _sfc_render107(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1107, _hoisted_3106);
}
var fold_default = export_helper_default(fold_vue_vue_type_script_lang_default, [["render", _sfc_render107], ["__file", "fold.vue"]]);
var folder_add_vue_vue_type_script_lang_default = {
  name: "FolderAdd"
};
var _hoisted_1108 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2108 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm384 416V416h64v128h128v64H544v128h-64V608H352v-64h128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3107 = [
  _hoisted_2108
];
function _sfc_render108(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1108, _hoisted_3107);
}
var folder_add_default = export_helper_default(folder_add_vue_vue_type_script_lang_default, [["render", _sfc_render108], ["__file", "folder-add.vue"]]);
var folder_checked_vue_vue_type_script_lang_default = {
  name: "FolderChecked"
};
var _hoisted_1109 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2109 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm414.08 502.144 180.992-180.992L736.32 494.4 510.08 720.64l-158.4-158.336 45.248-45.312L510.08 630.144z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3108 = [
  _hoisted_2109
];
function _sfc_render109(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1109, _hoisted_3108);
}
var folder_checked_default = export_helper_default(folder_checked_vue_vue_type_script_lang_default, [["render", _sfc_render109], ["__file", "folder-checked.vue"]]);
var folder_delete_vue_vue_type_script_lang_default = {
  name: "FolderDelete"
};
var _hoisted_1110 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2110 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm370.752 448-90.496-90.496 45.248-45.248L512 530.752l90.496-90.496 45.248 45.248L557.248 576l90.496 90.496-45.248 45.248L512 621.248l-90.496 90.496-45.248-45.248L466.752 576z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3109 = [
  _hoisted_2110
];
function _sfc_render110(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1110, _hoisted_3109);
}
var folder_delete_default = export_helper_default(folder_delete_vue_vue_type_script_lang_default, [["render", _sfc_render110], ["__file", "folder-delete.vue"]]);
var folder_opened_vue_vue_type_script_lang_default = {
  name: "FolderOpened"
};
var _hoisted_1111 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2111 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 0 1 216.96 384H832zm-24.96 512H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h287.872l128.384 128H864a32 32 0 0 1 32 32v96h23.04a32 32 0 0 1 31.04 39.744l-112 448A32 32 0 0 1 807.04 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3110 = [
  _hoisted_2111
];
function _sfc_render111(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1111, _hoisted_3110);
}
var folder_opened_default = export_helper_default(folder_opened_vue_vue_type_script_lang_default, [["render", _sfc_render111], ["__file", "folder-opened.vue"]]);
var folder_remove_vue_vue_type_script_lang_default = {
  name: "FolderRemove"
};
var _hoisted_1112 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2112 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm256 416h320v64H352v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3111 = [
  _hoisted_2112
];
function _sfc_render112(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1112, _hoisted_3111);
}
var folder_remove_default = export_helper_default(folder_remove_vue_vue_type_script_lang_default, [["render", _sfc_render112], ["__file", "folder-remove.vue"]]);
var folder_vue_vue_type_script_lang_default = {
  name: "Folder"
};
var _hoisted_1113 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2113 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3112 = [
  _hoisted_2113
];
function _sfc_render113(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1113, _hoisted_3112);
}
var folder_default = export_helper_default(folder_vue_vue_type_script_lang_default, [["render", _sfc_render113], ["__file", "folder.vue"]]);
var food_vue_vue_type_script_lang_default = {
  name: "Food"
};
var _hoisted_1114 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2114 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 352.576V352a288 288 0 0 1 491.072-204.224 192 192 0 0 1 274.24 204.48 64 64 0 0 1 57.216 74.24C921.6 600.512 850.048 710.656 736 756.992V800a96 96 0 0 1-96 96H384a96 96 0 0 1-96-96v-43.008c-114.048-46.336-185.6-156.48-214.528-330.496A64 64 0 0 1 128 352.64zm64-.576h64a160 160 0 0 1 320 0h64a224 224 0 0 0-448 0zm128 0h192a96 96 0 0 0-192 0zm439.424 0h68.544A128.256 128.256 0 0 0 704 192c-15.36 0-29.952 2.688-43.52 7.616 11.328 18.176 20.672 37.76 27.84 58.304A64.128 64.128 0 0 1 759.424 352zM672 768H352v32a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32v-32zm-342.528-64h365.056c101.504-32.64 165.76-124.928 192.896-288H136.576c27.136 163.072 91.392 255.36 192.896 288z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3113 = [
  _hoisted_2114
];
function _sfc_render114(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1114, _hoisted_3113);
}
var food_default = export_helper_default(food_vue_vue_type_script_lang_default, [["render", _sfc_render114], ["__file", "food.vue"]]);
var football_vue_vue_type_script_lang_default = {
  name: "Football"
};
var _hoisted_1115 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2115 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896zm0-64a384 384 0 1 0 0-768 384 384 0 0 0 0 768z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3114 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M186.816 268.288c16-16.384 31.616-31.744 46.976-46.08 17.472 30.656 39.808 58.112 65.984 81.28l-32.512 56.448a385.984 385.984 0 0 1-80.448-91.648zm653.696-5.312a385.92 385.92 0 0 1-83.776 96.96l-32.512-56.384a322.923 322.923 0 0 0 68.48-85.76c15.552 14.08 31.488 29.12 47.808 45.184zM465.984 445.248l11.136-63.104a323.584 323.584 0 0 0 69.76 0l11.136 63.104a387.968 387.968 0 0 1-92.032 0zm-62.72-12.8A381.824 381.824 0 0 1 320 396.544l32-55.424a319.885 319.885 0 0 0 62.464 27.712l-11.2 63.488zm300.8-35.84a381.824 381.824 0 0 1-83.328 35.84l-11.2-63.552A319.885 319.885 0 0 0 672 341.184l32 55.424zm-520.768 364.8a385.92 385.92 0 0 1 83.968-97.28l32.512 56.32c-26.88 23.936-49.856 52.352-67.52 84.032-16-13.44-32.32-27.712-48.96-43.072zm657.536.128a1442.759 1442.759 0 0 1-49.024 43.072 321.408 321.408 0 0 0-67.584-84.16l32.512-56.32c33.216 27.456 61.696 60.352 84.096 97.408zM465.92 578.752a387.968 387.968 0 0 1 92.032 0l-11.136 63.104a323.584 323.584 0 0 0-69.76 0l-11.136-63.104zm-62.72 12.8 11.2 63.552a319.885 319.885 0 0 0-62.464 27.712L320 627.392a381.824 381.824 0 0 1 83.264-35.84zm300.8 35.84-32 55.424a318.272 318.272 0 0 0-62.528-27.712l11.2-63.488c29.44 8.64 57.28 20.736 83.264 35.776z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_435 = [
  _hoisted_2115,
  _hoisted_3114
];
function _sfc_render115(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1115, _hoisted_435);
}
var football_default = export_helper_default(football_vue_vue_type_script_lang_default, [["render", _sfc_render115], ["__file", "football.vue"]]);
var fork_spoon_vue_vue_type_script_lang_default = {
  name: "ForkSpoon"
};
var _hoisted_1116 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2116 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 410.304V96a32 32 0 0 1 64 0v314.304a96 96 0 0 0 64-90.56V96a32 32 0 0 1 64 0v223.744a160 160 0 0 1-128 156.8V928a32 32 0 1 1-64 0V476.544a160 160 0 0 1-128-156.8V96a32 32 0 0 1 64 0v223.744a96 96 0 0 0 64 90.56zM672 572.48C581.184 552.128 512 446.848 512 320c0-141.44 85.952-256 192-256s192 114.56 192 256c0 126.848-69.184 232.128-160 252.48V928a32 32 0 1 1-64 0V572.48zM704 512c66.048 0 128-82.56 128-192s-61.952-192-128-192-128 82.56-128 192 61.952 192 128 192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3115 = [
  _hoisted_2116
];
function _sfc_render116(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1116, _hoisted_3115);
}
var fork_spoon_default = export_helper_default(fork_spoon_vue_vue_type_script_lang_default, [["render", _sfc_render116], ["__file", "fork-spoon.vue"]]);
var fries_vue_vue_type_script_lang_default = {
  name: "Fries"
};
var _hoisted_1117 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2117 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M608 224v-64a32 32 0 0 0-64 0v336h26.88A64 64 0 0 0 608 484.096V224zm101.12 160A64 64 0 0 0 672 395.904V384h64V224a32 32 0 1 0-64 0v160h37.12zm74.88 0a92.928 92.928 0 0 1 91.328 110.08l-60.672 323.584A96 96 0 0 1 720.32 896H303.68a96 96 0 0 1-94.336-78.336L148.672 494.08A92.928 92.928 0 0 1 240 384h-16V224a96 96 0 0 1 188.608-25.28A95.744 95.744 0 0 1 480 197.44V160a96 96 0 0 1 188.608-25.28A96 96 0 0 1 800 224v160h-16zM670.784 512a128 128 0 0 1-99.904 48H453.12a128 128 0 0 1-99.84-48H352v-1.536a128.128 128.128 0 0 1-9.984-14.976L314.88 448H240a28.928 28.928 0 0 0-28.48 34.304L241.088 640h541.824l29.568-157.696A28.928 28.928 0 0 0 784 448h-74.88l-27.136 47.488A132.405 132.405 0 0 1 672 510.464V512h-1.216zM480 288a32 32 0 0 0-64 0v196.096A64 64 0 0 0 453.12 496H480V288zm-128 96V224a32 32 0 0 0-64 0v160h64-37.12A64 64 0 0 1 352 395.904zm-98.88 320 19.072 101.888A32 32 0 0 0 303.68 832h416.64a32 32 0 0 0 31.488-26.112L770.88 704H253.12z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3116 = [
  _hoisted_2117
];
function _sfc_render117(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1117, _hoisted_3116);
}
var fries_default = export_helper_default(fries_vue_vue_type_script_lang_default, [["render", _sfc_render117], ["__file", "fries.vue"]]);
var full_screen_vue_vue_type_script_lang_default = {
  name: "FullScreen"
};
var _hoisted_1118 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2118 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3117 = [
  _hoisted_2118
];
function _sfc_render118(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1118, _hoisted_3117);
}
var full_screen_default = export_helper_default(full_screen_vue_vue_type_script_lang_default, [["render", _sfc_render118], ["__file", "full-screen.vue"]]);
var goblet_full_vue_vue_type_script_lang_default = {
  name: "GobletFull"
};
var _hoisted_1119 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2119 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 320h512c0-78.592-12.608-142.4-36.928-192h-434.24C269.504 192.384 256 256.256 256 320zm503.936 64H264.064a256.128 256.128 0 0 0 495.872 0zM544 638.4V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.4A320 320 0 0 1 192 320c0-85.632 21.312-170.944 64-256h512c42.688 64.32 64 149.632 64 256a320 320 0 0 1-288 318.4z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3118 = [
  _hoisted_2119
];
function _sfc_render119(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1119, _hoisted_3118);
}
var goblet_full_default = export_helper_default(goblet_full_vue_vue_type_script_lang_default, [["render", _sfc_render119], ["__file", "goblet-full.vue"]]);
var goblet_square_full_vue_vue_type_script_lang_default = {
  name: "GobletSquareFull"
};
var _hoisted_1120 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2120 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 270.912c10.048 6.72 22.464 14.912 28.992 18.624a220.16 220.16 0 0 0 114.752 30.72c30.592 0 49.408-9.472 91.072-41.152l.64-.448c52.928-40.32 82.368-55.04 132.288-54.656 55.552.448 99.584 20.8 142.72 57.408l1.536 1.28V128H256v142.912zm.96 76.288C266.368 482.176 346.88 575.872 512 576c157.44.064 237.952-85.056 253.248-209.984a952.32 952.32 0 0 1-40.192-35.712c-32.704-27.776-63.36-41.92-101.888-42.24-31.552-.256-50.624 9.28-93.12 41.6l-.576.448c-52.096 39.616-81.024 54.208-129.792 54.208-54.784 0-100.48-13.376-142.784-37.056zM480 638.848C250.624 623.424 192 442.496 192 319.68V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v224c0 122.816-58.624 303.68-288 318.912V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.848z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3119 = [
  _hoisted_2120
];
function _sfc_render120(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1120, _hoisted_3119);
}
var goblet_square_full_default = export_helper_default(goblet_square_full_vue_vue_type_script_lang_default, [["render", _sfc_render120], ["__file", "goblet-square-full.vue"]]);
var goblet_square_vue_vue_type_script_lang_default = {
  name: "GobletSquare"
};
var _hoisted_1121 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2121 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 638.912V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.848C250.624 623.424 192 442.496 192 319.68V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v224c0 122.816-58.624 303.68-288 318.912zM256 319.68c0 149.568 80 256.192 256 256.256C688.128 576 768 469.568 768 320V128H256v191.68z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3120 = [
  _hoisted_2121
];
function _sfc_render121(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1121, _hoisted_3120);
}
var goblet_square_default = export_helper_default(goblet_square_vue_vue_type_script_lang_default, [["render", _sfc_render121], ["__file", "goblet-square.vue"]]);
var goblet_vue_vue_type_script_lang_default = {
  name: "Goblet"
};
var _hoisted_1122 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2122 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 638.4V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.4A320 320 0 0 1 192 320c0-85.632 21.312-170.944 64-256h512c42.688 64.32 64 149.632 64 256a320 320 0 0 1-288 318.4zM256 320a256 256 0 1 0 512 0c0-78.592-12.608-142.4-36.928-192h-434.24C269.504 192.384 256 256.256 256 320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3121 = [
  _hoisted_2122
];
function _sfc_render122(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1122, _hoisted_3121);
}
var goblet_default = export_helper_default(goblet_vue_vue_type_script_lang_default, [["render", _sfc_render122], ["__file", "goblet.vue"]]);
var gold_medal_vue_vue_type_script_lang_default = {
  name: "GoldMedal"
};
var _hoisted_1123 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2123 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m772.13 452.84 53.86-351.81c1.32-10.01-1.17-18.68-7.49-26.02S804.35 64 795.01 64H228.99v-.01h-.06c-9.33 0-17.15 3.67-23.49 11.01s-8.83 16.01-7.49 26.02l53.87 351.89C213.54 505.73 193.59 568.09 192 640c2 90.67 33.17 166.17 93.5 226.5S421.33 957.99 512 960c90.67-2 166.17-33.17 226.5-93.5 60.33-60.34 91.49-135.83 93.5-226.5-1.59-71.94-21.56-134.32-59.87-187.16zM640.01 128h117.02l-39.01 254.02c-20.75-10.64-40.74-19.73-59.94-27.28-5.92-3-11.95-5.8-18.08-8.41V128h.01zM576 128v198.76c-13.18-2.58-26.74-4.43-40.67-5.55-8.07-.8-15.85-1.2-23.33-1.2-10.54 0-21.09.66-31.64 1.96a359.844 359.844 0 0 0-32.36 4.79V128h128zm-192 0h.04v218.3c-6.22 2.66-12.34 5.5-18.36 8.56-19.13 7.54-39.02 16.6-59.66 27.16L267.01 128H384zm308.99 692.99c-48 48-108.33 73-180.99 75.01-72.66-2.01-132.99-27.01-180.99-75.01S258.01 712.66 256 640c2.01-72.66 27.01-132.99 75.01-180.99 19.67-19.67 41.41-35.47 65.22-47.41 38.33-15.04 71.15-23.92 98.44-26.65 5.07-.41 10.2-.7 15.39-.88.63-.01 1.28-.03 1.91-.03.66 0 1.35.03 2.02.04 5.11.17 10.15.46 15.13.86 27.4 2.71 60.37 11.65 98.91 26.79 23.71 11.93 45.36 27.69 64.96 47.29 48 48 73 108.33 75.01 180.99-2.01 72.65-27.01 132.98-75.01 180.98z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3122 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 480H416v64h64v192h-64v64h192v-64h-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_436 = [
  _hoisted_2123,
  _hoisted_3122
];
function _sfc_render123(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1123, _hoisted_436);
}
var gold_medal_default = export_helper_default(gold_medal_vue_vue_type_script_lang_default, [["render", _sfc_render123], ["__file", "gold-medal.vue"]]);
var goods_filled_vue_vue_type_script_lang_default = {
  name: "GoodsFilled"
};
var _hoisted_1124 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2124 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 352h640l64 544H128l64-544zm128 224h64V448h-64v128zm320 0h64V448h-64v128zM384 288h-64a192 192 0 1 1 384 0h-64a128 128 0 1 0-256 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3123 = [
  _hoisted_2124
];
function _sfc_render124(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1124, _hoisted_3123);
}
var goods_filled_default = export_helper_default(goods_filled_vue_vue_type_script_lang_default, [["render", _sfc_render124], ["__file", "goods-filled.vue"]]);
var goods_vue_vue_type_script_lang_default = {
  name: "Goods"
};
var _hoisted_1125 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2125 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M320 288v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4h131.072a32 32 0 0 1 31.808 28.8l57.6 576a32 32 0 0 1-31.808 35.2H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320zm64 0h256v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4zm-64 64H217.92l-51.2 512h690.56l-51.264-512H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3124 = [
  _hoisted_2125
];
function _sfc_render125(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1125, _hoisted_3124);
}
var goods_default = export_helper_default(goods_vue_vue_type_script_lang_default, [["render", _sfc_render125], ["__file", "goods.vue"]]);
var grape_vue_vue_type_script_lang_default = {
  name: "Grape"
};
var _hoisted_1126 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2126 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 195.2a160 160 0 0 1 96 60.8 160 160 0 1 1 146.24 254.976 160 160 0 0 1-128 224 160 160 0 1 1-292.48 0 160 160 0 0 1-128-224A160 160 0 1 1 384 256a160 160 0 0 1 96-60.8V128h-64a32 32 0 0 1 0-64h192a32 32 0 0 1 0 64h-64v67.2zM512 448a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm-256 0a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128 224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128 224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128-224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128-224a96 96 0 1 0 0-192 96 96 0 0 0 0 192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3125 = [
  _hoisted_2126
];
function _sfc_render126(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1126, _hoisted_3125);
}
var grape_default = export_helper_default(grape_vue_vue_type_script_lang_default, [["render", _sfc_render126], ["__file", "grape.vue"]]);
var grid_vue_vue_type_script_lang_default = {
  name: "Grid"
};
var _hoisted_1127 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2127 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 384v256H384V384h256zm64 0h192v256H704V384zm-64 512H384V704h256v192zm64 0V704h192v192H704zm-64-768v192H384V128h256zm64 0h192v192H704V128zM320 384v256H128V384h192zm0 512H128V704h192v192zm0-768v192H128V128h192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3126 = [
  _hoisted_2127
];
function _sfc_render127(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1127, _hoisted_3126);
}
var grid_default = export_helper_default(grid_vue_vue_type_script_lang_default, [["render", _sfc_render127], ["__file", "grid.vue"]]);
var guide_vue_vue_type_script_lang_default = {
  name: "Guide"
};
var _hoisted_1128 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2128 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 608h-64V416h64v192zm0 160v160a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V768h64v128h128V768h64zM384 608V416h64v192h-64zm256-352h-64V128H448v128h-64V96a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v160z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3127 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m220.8 256-71.232 80 71.168 80H768V256H220.8zm-14.4-64H800a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32H206.4a32 32 0 0 1-23.936-10.752l-99.584-112a32 32 0 0 1 0-42.496l99.584-112A32 32 0 0 1 206.4 192zm678.784 496-71.104 80H266.816V608h547.2l71.168 80zm-56.768-144H234.88a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h593.6a32 32 0 0 0 23.936-10.752l99.584-112a32 32 0 0 0 0-42.496l-99.584-112A32 32 0 0 0 828.48 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_437 = [
  _hoisted_2128,
  _hoisted_3127
];
function _sfc_render128(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1128, _hoisted_437);
}
var guide_default = export_helper_default(guide_vue_vue_type_script_lang_default, [["render", _sfc_render128], ["__file", "guide.vue"]]);
var handbag_vue_vue_type_script_lang_default = {
  name: "Handbag"
};
var _hoisted_1129 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2129 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M887.01 264.99c-6-5.99-13.67-8.99-23.01-8.99H704c-1.34-54.68-20.01-100.01-56-136s-81.32-54.66-136-56c-54.68 1.34-100.01 20.01-136 56s-54.66 81.32-56 136H160c-9.35 0-17.02 3-23.01 8.99-5.99 6-8.99 13.67-8.99 23.01v640c0 9.35 2.99 17.02 8.99 23.01S150.66 960 160 960h704c9.35 0 17.02-2.99 23.01-8.99S896 937.34 896 928V288c0-9.35-2.99-17.02-8.99-23.01zM421.5 165.5c24.32-24.34 54.49-36.84 90.5-37.5 35.99.68 66.16 13.18 90.5 37.5s36.84 54.49 37.5 90.5H384c.68-35.99 13.18-66.16 37.5-90.5zM832 896H192V320h128v128h64V320h256v128h64V320h128v576z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3128 = [
  _hoisted_2129
];
function _sfc_render129(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1129, _hoisted_3128);
}
var handbag_default = export_helper_default(handbag_vue_vue_type_script_lang_default, [["render", _sfc_render129], ["__file", "handbag.vue"]]);
var headset_vue_vue_type_script_lang_default = {
  name: "Headset"
};
var _hoisted_1130 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2130 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3129 = [
  _hoisted_2130
];
function _sfc_render130(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1130, _hoisted_3129);
}
var headset_default = export_helper_default(headset_vue_vue_type_script_lang_default, [["render", _sfc_render130], ["__file", "headset.vue"]]);
var help_filled_vue_vue_type_script_lang_default = {
  name: "HelpFilled"
};
var _hoisted_1131 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2131 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M926.784 480H701.312A192.512 192.512 0 0 0 544 322.688V97.216A416.064 416.064 0 0 1 926.784 480zm0 64A416.064 416.064 0 0 1 544 926.784V701.312A192.512 192.512 0 0 0 701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 0 0 480 701.312v225.472A416.064 416.064 0 0 1 97.216 544zm0-64A416.064 416.064 0 0 1 480 97.216v225.472A192.512 192.512 0 0 0 322.688 480H97.216z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3130 = [
  _hoisted_2131
];
function _sfc_render131(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1131, _hoisted_3130);
}
var help_filled_default = export_helper_default(help_filled_vue_vue_type_script_lang_default, [["render", _sfc_render131], ["__file", "help-filled.vue"]]);
var help_vue_vue_type_script_lang_default = {
  name: "Help"
};
var _hoisted_1132 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2132 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m759.936 805.248-90.944-91.008A254.912 254.912 0 0 1 512 768a254.912 254.912 0 0 1-156.992-53.76l-90.944 91.008A382.464 382.464 0 0 0 512 896c94.528 0 181.12-34.176 247.936-90.752zm45.312-45.312A382.464 382.464 0 0 0 896 512c0-94.528-34.176-181.12-90.752-247.936l-91.008 90.944C747.904 398.4 768 452.864 768 512c0 59.136-20.096 113.6-53.76 156.992l91.008 90.944zm-45.312-541.184A382.464 382.464 0 0 0 512 128c-94.528 0-181.12 34.176-247.936 90.752l90.944 91.008A254.912 254.912 0 0 1 512 256c59.136 0 113.6 20.096 156.992 53.76l90.944-91.008zm-541.184 45.312A382.464 382.464 0 0 0 128 512c0 94.528 34.176 181.12 90.752 247.936l91.008-90.944A254.912 254.912 0 0 1 256 512c0-59.136 20.096-113.6 53.76-156.992l-91.008-90.944zm417.28 394.496a194.56 194.56 0 0 0 22.528-22.528C686.912 602.56 704 559.232 704 512a191.232 191.232 0 0 0-67.968-146.56A191.296 191.296 0 0 0 512 320a191.232 191.232 0 0 0-146.56 67.968C337.088 421.44 320 464.768 320 512a191.232 191.232 0 0 0 67.968 146.56C421.44 686.912 464.768 704 512 704c47.296 0 90.56-17.088 124.032-45.44zM512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3131 = [
  _hoisted_2132
];
function _sfc_render132(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1132, _hoisted_3131);
}
var help_default = export_helper_default(help_vue_vue_type_script_lang_default, [["render", _sfc_render132], ["__file", "help.vue"]]);
var hide_vue_vue_type_script_lang_default = {
  name: "Hide"
};
var _hoisted_1133 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2133 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3132 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_438 = [
  _hoisted_2133,
  _hoisted_3132
];
function _sfc_render133(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1133, _hoisted_438);
}
var hide_default = export_helper_default(hide_vue_vue_type_script_lang_default, [["render", _sfc_render133], ["__file", "hide.vue"]]);
var histogram_vue_vue_type_script_lang_default = {
  name: "Histogram"
};
var _hoisted_1134 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2134 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M416 896V128h192v768H416zm-288 0V448h192v448H128zm576 0V320h192v576H704z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3133 = [
  _hoisted_2134
];
function _sfc_render134(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1134, _hoisted_3133);
}
var histogram_default = export_helper_default(histogram_vue_vue_type_script_lang_default, [["render", _sfc_render134], ["__file", "histogram.vue"]]);
var home_filled_vue_vue_type_script_lang_default = {
  name: "HomeFilled"
};
var _hoisted_1135 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2135 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3134 = [
  _hoisted_2135
];
function _sfc_render135(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1135, _hoisted_3134);
}
var home_filled_default = export_helper_default(home_filled_vue_vue_type_script_lang_default, [["render", _sfc_render135], ["__file", "home-filled.vue"]]);
var hot_water_vue_vue_type_script_lang_default = {
  name: "HotWater"
};
var _hoisted_1136 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2136 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M273.067 477.867h477.866V409.6H273.067v68.267zm0 68.266v51.2A187.733 187.733 0 0 0 460.8 785.067h102.4a187.733 187.733 0 0 0 187.733-187.734v-51.2H273.067zm-34.134-204.8h546.134a34.133 34.133 0 0 1 34.133 34.134v221.866a256 256 0 0 1-256 256H460.8a256 256 0 0 1-256-256V375.467a34.133 34.133 0 0 1 34.133-34.134zM512 34.133a34.133 34.133 0 0 1 34.133 34.134v170.666a34.133 34.133 0 0 1-68.266 0V68.267A34.133 34.133 0 0 1 512 34.133zM375.467 102.4a34.133 34.133 0 0 1 34.133 34.133v102.4a34.133 34.133 0 0 1-68.267 0v-102.4a34.133 34.133 0 0 1 34.134-34.133zm273.066 0a34.133 34.133 0 0 1 34.134 34.133v102.4a34.133 34.133 0 1 1-68.267 0v-102.4a34.133 34.133 0 0 1 34.133-34.133zM170.667 921.668h682.666a34.133 34.133 0 1 1 0 68.267H170.667a34.133 34.133 0 1 1 0-68.267z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3135 = [
  _hoisted_2136
];
function _sfc_render136(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1136, _hoisted_3135);
}
var hot_water_default = export_helper_default(hot_water_vue_vue_type_script_lang_default, [["render", _sfc_render136], ["__file", "hot-water.vue"]]);
var house_vue_vue_type_script_lang_default = {
  name: "House"
};
var _hoisted_1137 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2137 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 413.952V896h640V413.952L512 147.328 192 413.952zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3136 = [
  _hoisted_2137
];
function _sfc_render137(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1137, _hoisted_3136);
}
var house_default = export_helper_default(house_vue_vue_type_script_lang_default, [["render", _sfc_render137], ["__file", "house.vue"]]);
var ice_cream_round_vue_vue_type_script_lang_default = {
  name: "IceCreamRound"
};
var _hoisted_1138 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2138 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m308.352 489.344 226.304 226.304a32 32 0 0 0 45.248 0L783.552 512A192 192 0 1 0 512 240.448L308.352 444.16a32 32 0 0 0 0 45.248zm135.744 226.304L308.352 851.392a96 96 0 0 1-135.744-135.744l135.744-135.744-45.248-45.248a96 96 0 0 1 0-135.808L466.752 195.2A256 256 0 0 1 828.8 557.248L625.152 760.96a96 96 0 0 1-135.808 0l-45.248-45.248zM398.848 670.4 353.6 625.152 217.856 760.896a32 32 0 0 0 45.248 45.248L398.848 670.4zm248.96-384.64a32 32 0 0 1 0 45.248L466.624 512a32 32 0 1 1-45.184-45.248l180.992-181.056a32 32 0 0 1 45.248 0zm90.496 90.496a32 32 0 0 1 0 45.248L557.248 602.496A32 32 0 1 1 512 557.248l180.992-180.992a32 32 0 0 1 45.312 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3137 = [
  _hoisted_2138
];
function _sfc_render138(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1138, _hoisted_3137);
}
var ice_cream_round_default = export_helper_default(ice_cream_round_vue_vue_type_script_lang_default, [["render", _sfc_render138], ["__file", "ice-cream-round.vue"]]);
var ice_cream_square_vue_vue_type_script_lang_default = {
  name: "IceCreamSquare"
};
var _hoisted_1139 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2139 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M416 640h256a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h64zm192 64v160a96 96 0 0 1-192 0V704h-64a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h320a96 96 0 0 1 96 96v448a96 96 0 0 1-96 96h-64zm-64 0h-64v160a32 32 0 1 0 64 0V704z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3138 = [
  _hoisted_2139
];
function _sfc_render139(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1139, _hoisted_3138);
}
var ice_cream_square_default = export_helper_default(ice_cream_square_vue_vue_type_script_lang_default, [["render", _sfc_render139], ["__file", "ice-cream-square.vue"]]);
var ice_cream_vue_vue_type_script_lang_default = {
  name: "IceCream"
};
var _hoisted_1140 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2140 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128.64 448a208 208 0 0 1 193.536-191.552 224 224 0 0 1 445.248 15.488A208.128 208.128 0 0 1 894.784 448H896L548.8 983.68a32 32 0 0 1-53.248.704L128 448h.64zm64.256 0h286.208a144 144 0 0 0-286.208 0zm351.36 0h286.272a144 144 0 0 0-286.272 0zm-294.848 64 271.808 396.608L778.24 512H249.408zM511.68 352.64a207.872 207.872 0 0 1 189.184-96.192 160 160 0 0 0-314.752 5.632c52.608 12.992 97.28 46.08 125.568 90.56z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3139 = [
  _hoisted_2140
];
function _sfc_render140(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1140, _hoisted_3139);
}
var ice_cream_default = export_helper_default(ice_cream_vue_vue_type_script_lang_default, [["render", _sfc_render140], ["__file", "ice-cream.vue"]]);
var ice_drink_vue_vue_type_script_lang_default = {
  name: "IceDrink"
};
var _hoisted_1141 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2141 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 448v128h239.68l16.064-128H512zm-64 0H256.256l16.064 128H448V448zm64-255.36V384h247.744A256.128 256.128 0 0 0 512 192.64zm-64 8.064A256.448 256.448 0 0 0 264.256 384H448V200.704zm64-72.064A320.128 320.128 0 0 1 825.472 384H896a32 32 0 1 1 0 64h-64v1.92l-56.96 454.016A64 64 0 0 1 711.552 960H312.448a64 64 0 0 1-63.488-56.064L192 449.92V448h-64a32 32 0 0 1 0-64h70.528A320.384 320.384 0 0 1 448 135.04V96a96 96 0 0 1 96-96h128a32 32 0 1 1 0 64H544a32 32 0 0 0-32 32v32.64zM743.68 640H280.32l32.128 256h399.104l32.128-256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3140 = [
  _hoisted_2141
];
function _sfc_render141(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1141, _hoisted_3140);
}
var ice_drink_default = export_helper_default(ice_drink_vue_vue_type_script_lang_default, [["render", _sfc_render141], ["__file", "ice-drink.vue"]]);
var ice_tea_vue_vue_type_script_lang_default = {
  name: "IceTea"
};
var _hoisted_1142 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2142 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M197.696 259.648a320.128 320.128 0 0 1 628.608 0A96 96 0 0 1 896 352v64a96 96 0 0 1-71.616 92.864l-49.408 395.072A64 64 0 0 1 711.488 960H312.512a64 64 0 0 1-63.488-56.064l-49.408-395.072A96 96 0 0 1 128 416v-64a96 96 0 0 1 69.696-92.352zM264.064 256h495.872a256.128 256.128 0 0 0-495.872 0zm495.424 256H264.512l48 384h398.976l48-384zM224 448h576a32 32 0 0 0 32-32v-64a32 32 0 0 0-32-32H224a32 32 0 0 0-32 32v64a32 32 0 0 0 32 32zm160 192h64v64h-64v-64zm192 64h64v64h-64v-64zm-128 64h64v64h-64v-64zm64-192h64v64h-64v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3141 = [
  _hoisted_2142
];
function _sfc_render142(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1142, _hoisted_3141);
}
var ice_tea_default = export_helper_default(ice_tea_vue_vue_type_script_lang_default, [["render", _sfc_render142], ["__file", "ice-tea.vue"]]);
var info_filled_vue_vue_type_script_lang_default = {
  name: "InfoFilled"
};
var _hoisted_1143 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2143 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3142 = [
  _hoisted_2143
];
function _sfc_render143(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1143, _hoisted_3142);
}
var info_filled_default = export_helper_default(info_filled_vue_vue_type_script_lang_default, [["render", _sfc_render143], ["__file", "info-filled.vue"]]);
var iphone_vue_vue_type_script_lang_default = {
  name: "Iphone"
};
var _hoisted_1144 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2144 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 768v96.064a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V768H224zm0-64h576V160a64 64 0 0 0-64-64H288a64 64 0 0 0-64 64v544zm32 288a96 96 0 0 1-96-96V128a96 96 0 0 1 96-96h512a96 96 0 0 1 96 96v768a96 96 0 0 1-96 96H256zm304-144a48 48 0 1 1-96 0 48 48 0 0 1 96 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3143 = [
  _hoisted_2144
];
function _sfc_render144(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1144, _hoisted_3143);
}
var iphone_default = export_helper_default(iphone_vue_vue_type_script_lang_default, [["render", _sfc_render144], ["__file", "iphone.vue"]]);
var key_vue_vue_type_script_lang_default = {
  name: "Key"
};
var _hoisted_1145 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2145 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 456.064V96a32 32 0 0 1 32-32.064L672 64a32 32 0 0 1 0 64H512v128h160a32 32 0 0 1 0 64H512v128a256 256 0 1 1-64 8.064zM512 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3144 = [
  _hoisted_2145
];
function _sfc_render145(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1145, _hoisted_3144);
}
var key_default = export_helper_default(key_vue_vue_type_script_lang_default, [["render", _sfc_render145], ["__file", "key.vue"]]);
var knife_fork_vue_vue_type_script_lang_default = {
  name: "KnifeFork"
};
var _hoisted_1146 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2146 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 410.56V96a32 32 0 0 1 64 0v314.56A96 96 0 0 0 384 320V96a32 32 0 0 1 64 0v224a160 160 0 0 1-128 156.8V928a32 32 0 1 1-64 0V476.8A160 160 0 0 1 128 320V96a32 32 0 0 1 64 0v224a96 96 0 0 0 64 90.56zm384-250.24V544h126.72c-3.328-78.72-12.928-147.968-28.608-207.744-14.336-54.528-46.848-113.344-98.112-175.872zM640 608v320a32 32 0 1 1-64 0V64h64c85.312 89.472 138.688 174.848 160 256 21.312 81.152 32 177.152 32 288H640z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3145 = [
  _hoisted_2146
];
function _sfc_render146(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1146, _hoisted_3145);
}
var knife_fork_default = export_helper_default(knife_fork_vue_vue_type_script_lang_default, [["render", _sfc_render146], ["__file", "knife-fork.vue"]]);
var lightning_vue_vue_type_script_lang_default = {
  name: "Lightning"
};
var _hoisted_1147 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2147 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 671.36v64.128A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 736 734.016v-64.768a192 192 0 0 0 3.328-377.92l-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 91.968 70.464 167.36 160.256 175.232z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3146 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M416 736a32 32 0 0 1-27.776-47.872l128-224a32 32 0 1 1 55.552 31.744L471.168 672H608a32 32 0 0 1 27.776 47.872l-128 224a32 32 0 1 1-55.68-31.744L552.96 736H416z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_439 = [
  _hoisted_2147,
  _hoisted_3146
];
function _sfc_render147(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1147, _hoisted_439);
}
var lightning_default = export_helper_default(lightning_vue_vue_type_script_lang_default, [["render", _sfc_render147], ["__file", "lightning.vue"]]);
var link_vue_vue_type_script_lang_default = {
  name: "Link"
};
var _hoisted_1148 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2148 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496 45.248 45.248zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152 625.152 353.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3147 = [
  _hoisted_2148
];
function _sfc_render148(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1148, _hoisted_3147);
}
var link_default = export_helper_default(link_vue_vue_type_script_lang_default, [["render", _sfc_render148], ["__file", "link.vue"]]);
var list_vue_vue_type_script_lang_default = {
  name: "List"
};
var _hoisted_1149 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2149 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3148 = [
  _hoisted_2149
];
function _sfc_render149(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1149, _hoisted_3148);
}
var list_default = export_helper_default(list_vue_vue_type_script_lang_default, [["render", _sfc_render149], ["__file", "list.vue"]]);
var loading_vue_vue_type_script_lang_default = {
  name: "Loading"
};
var _hoisted_1150 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2150 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3149 = [
  _hoisted_2150
];
function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1150, _hoisted_3149);
}
var loading_default = export_helper_default(loading_vue_vue_type_script_lang_default, [["render", _sfc_render150], ["__file", "loading.vue"]]);
var location_filled_vue_vue_type_script_lang_default = {
  name: "LocationFilled"
};
var _hoisted_1151 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2151 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 928c23.936 0 117.504-68.352 192.064-153.152C803.456 661.888 864 535.808 864 416c0-189.632-155.84-320-352-320S160 226.368 160 416c0 120.32 60.544 246.4 159.936 359.232C394.432 859.84 488 928 512 928zm0-435.2a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 140.8a204.8 204.8 0 1 1 0-409.6 204.8 204.8 0 0 1 0 409.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3150 = [
  _hoisted_2151
];
function _sfc_render151(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1151, _hoisted_3150);
}
var location_filled_default = export_helper_default(location_filled_vue_vue_type_script_lang_default, [["render", _sfc_render151], ["__file", "location-filled.vue"]]);
var location_information_vue_vue_type_script_lang_default = {
  name: "LocationInformation"
};
var _hoisted_1152 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2152 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3151 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_440 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_511 = [
  _hoisted_2152,
  _hoisted_3151,
  _hoisted_440
];
function _sfc_render152(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1152, _hoisted_511);
}
var location_information_default = export_helper_default(location_information_vue_vue_type_script_lang_default, [["render", _sfc_render152], ["__file", "location-information.vue"]]);
var location_vue_vue_type_script_lang_default = {
  name: "Location"
};
var _hoisted_1153 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2153 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3152 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_441 = [
  _hoisted_2153,
  _hoisted_3152
];
function _sfc_render153(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1153, _hoisted_441);
}
var location_default = export_helper_default(location_vue_vue_type_script_lang_default, [["render", _sfc_render153], ["__file", "location.vue"]]);
var lock_vue_vue_type_script_lang_default = {
  name: "Lock"
};
var _hoisted_1154 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2154 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3153 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_442 = [
  _hoisted_2154,
  _hoisted_3153
];
function _sfc_render154(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1154, _hoisted_442);
}
var lock_default = export_helper_default(lock_vue_vue_type_script_lang_default, [["render", _sfc_render154], ["__file", "lock.vue"]]);
var lollipop_vue_vue_type_script_lang_default = {
  name: "Lollipop"
};
var _hoisted_1155 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2155 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M513.28 448a64 64 0 1 1 76.544 49.728A96 96 0 0 0 768 448h64a160 160 0 0 1-320 0h1.28zm-126.976-29.696a256 256 0 1 0 43.52-180.48A256 256 0 0 1 832 448h-64a192 192 0 0 0-381.696-29.696zm105.664 249.472L285.696 874.048a96 96 0 0 1-135.68-135.744l206.208-206.272a320 320 0 1 1 135.744 135.744zm-54.464-36.032a321.92 321.92 0 0 1-45.248-45.248L195.2 783.552a32 32 0 1 0 45.248 45.248l197.056-197.12z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3154 = [
  _hoisted_2155
];
function _sfc_render155(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1155, _hoisted_3154);
}
var lollipop_default = export_helper_default(lollipop_vue_vue_type_script_lang_default, [["render", _sfc_render155], ["__file", "lollipop.vue"]]);
var magic_stick_vue_vue_type_script_lang_default = {
  name: "MagicStick"
};
var _hoisted_1156 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2156 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64h64v192h-64V64zm0 576h64v192h-64V640zM160 480v-64h192v64H160zm576 0v-64h192v64H736zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248L657.152 606.4zM114.048 923.2 68.8 877.952l316.8-316.8 45.248 45.248-316.8 316.8zM702.4 334.848 657.152 289.6l135.744-135.744 45.248 45.248L702.4 334.848z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3155 = [
  _hoisted_2156
];
function _sfc_render156(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1156, _hoisted_3155);
}
var magic_stick_default = export_helper_default(magic_stick_vue_vue_type_script_lang_default, [["render", _sfc_render156], ["__file", "magic-stick.vue"]]);
var magnet_vue_vue_type_script_lang_default = {
  name: "Magnet"
};
var _hoisted_1157 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2157 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 320V192H704v320a192 192 0 1 1-384 0V192H192v128h128v64H192v128a320 320 0 0 0 640 0V384H704v-64h128zM640 512V128h256v384a384 384 0 1 1-768 0V128h256v384a128 128 0 1 0 256 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3156 = [
  _hoisted_2157
];
function _sfc_render157(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1157, _hoisted_3156);
}
var magnet_default = export_helper_default(magnet_vue_vue_type_script_lang_default, [["render", _sfc_render157], ["__file", "magnet.vue"]]);
var male_vue_vue_type_script_lang_default = {
  name: "Male"
};
var _hoisted_1158 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2158 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M399.5 849.5a225 225 0 1 0 0-450 225 225 0 0 0 0 450zm0 56.25a281.25 281.25 0 1 1 0-562.5 281.25 281.25 0 0 1 0 562.5zm253.125-787.5h225q28.125 0 28.125 28.125T877.625 174.5h-225q-28.125 0-28.125-28.125t28.125-28.125z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3157 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M877.625 118.25q28.125 0 28.125 28.125v225q0 28.125-28.125 28.125T849.5 371.375v-225q0-28.125 28.125-28.125z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_443 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M604.813 458.9 565.1 419.131l292.613-292.668 39.825 39.824z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_512 = [
  _hoisted_2158,
  _hoisted_3157,
  _hoisted_443
];
function _sfc_render158(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1158, _hoisted_512);
}
var male_default = export_helper_default(male_vue_vue_type_script_lang_default, [["render", _sfc_render158], ["__file", "male.vue"]]);
var management_vue_vue_type_script_lang_default = {
  name: "Management"
};
var _hoisted_1159 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2159 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M576 128v288l96-96 96 96V128h128v768H320V128h256zm-448 0h128v768H128V128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3158 = [
  _hoisted_2159
];
function _sfc_render159(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1159, _hoisted_3158);
}
var management_default = export_helper_default(management_vue_vue_type_script_lang_default, [["render", _sfc_render159], ["__file", "management.vue"]]);
var map_location_vue_vue_type_script_lang_default = {
  name: "MapLocation"
};
var _hoisted_1160 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2160 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3159 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256zm345.6 192L960 960H672v-64H352v64H64l102.4-256h691.2zm-68.928 0H235.328l-76.8 192h706.944l-76.8-192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_444 = [
  _hoisted_2160,
  _hoisted_3159
];
function _sfc_render160(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1160, _hoisted_444);
}
var map_location_default = export_helper_default(map_location_vue_vue_type_script_lang_default, [["render", _sfc_render160], ["__file", "map-location.vue"]]);
var medal_vue_vue_type_script_lang_default = {
  name: "Medal"
};
var _hoisted_1161 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2161 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3160 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M576 128H448v200a286.72 286.72 0 0 1 64-8c19.52 0 40.832 2.688 64 8V128zm64 0v219.648c24.448 9.088 50.56 20.416 78.4 33.92L757.44 128H640zm-256 0H266.624l39.04 253.568c27.84-13.504 53.888-24.832 78.336-33.92V128zM229.312 64h565.376a32 32 0 0 1 31.616 36.864L768 480c-113.792-64-199.104-96-256-96-56.896 0-142.208 32-256 96l-58.304-379.136A32 32 0 0 1 229.312 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_445 = [
  _hoisted_2161,
  _hoisted_3160
];
function _sfc_render161(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1161, _hoisted_445);
}
var medal_default = export_helper_default(medal_vue_vue_type_script_lang_default, [["render", _sfc_render161], ["__file", "medal.vue"]]);
var memo_vue_vue_type_script_lang_default = {
  name: "Memo"
};
var _hoisted_1162 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2162 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 320h192c21.33 0 32-10.67 32-32s-10.67-32-32-32H480c-21.33 0-32 10.67-32 32s10.67 32 32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3161 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M887.01 72.99C881.01 67 873.34 64 864 64H160c-9.35 0-17.02 3-23.01 8.99C131 78.99 128 86.66 128 96v832c0 9.35 2.99 17.02 8.99 23.01S150.66 960 160 960h704c9.35 0 17.02-2.99 23.01-8.99S896 937.34 896 928V96c0-9.35-3-17.02-8.99-23.01zM192 896V128h96v768h-96zm640 0H352V128h480v768z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_446 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 512h192c21.33 0 32-10.67 32-32s-10.67-32-32-32H480c-21.33 0-32 10.67-32 32s10.67 32 32 32zm0 192h192c21.33 0 32-10.67 32-32s-10.67-32-32-32H480c-21.33 0-32 10.67-32 32s10.67 32 32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_513 = [
  _hoisted_2162,
  _hoisted_3161,
  _hoisted_446
];
function _sfc_render162(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1162, _hoisted_513);
}
var memo_default = export_helper_default(memo_vue_vue_type_script_lang_default, [["render", _sfc_render162], ["__file", "memo.vue"]]);
var menu_vue_vue_type_script_lang_default = {
  name: "Menu"
};
var _hoisted_1163 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2163 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3162 = [
  _hoisted_2163
];
function _sfc_render163(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1163, _hoisted_3162);
}
var menu_default = export_helper_default(menu_vue_vue_type_script_lang_default, [["render", _sfc_render163], ["__file", "menu.vue"]]);
var message_box_vue_vue_type_script_lang_default = {
  name: "MessageBox"
};
var _hoisted_1164 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2164 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 384h448v64H288v-64zm96-128h256v64H384v-64zM131.456 512H384v128h256V512h252.544L721.856 192H302.144L131.456 512zM896 576H704v128H320V576H128v256h768V576zM275.776 128h472.448a32 32 0 0 1 28.608 17.664l179.84 359.552A32 32 0 0 1 960 519.552V864a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V519.552a32 32 0 0 1 3.392-14.336l179.776-359.552A32 32 0 0 1 275.776 128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3163 = [
  _hoisted_2164
];
function _sfc_render164(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1164, _hoisted_3163);
}
var message_box_default = export_helper_default(message_box_vue_vue_type_script_lang_default, [["render", _sfc_render164], ["__file", "message-box.vue"]]);
var message_vue_vue_type_script_lang_default = {
  name: "Message"
};
var _hoisted_1165 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2165 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3164 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_447 = [
  _hoisted_2165,
  _hoisted_3164
];
function _sfc_render165(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1165, _hoisted_447);
}
var message_default = export_helper_default(message_vue_vue_type_script_lang_default, [["render", _sfc_render165], ["__file", "message.vue"]]);
var mic_vue_vue_type_script_lang_default = {
  name: "Mic"
};
var _hoisted_1166 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2166 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 704h160a64 64 0 0 0 64-64v-32h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-32a64 64 0 0 0-64-64H384a64 64 0 0 0-64 64v32h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v32a64 64 0 0 0 64 64h96zm64 64v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768h-96a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64h256a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128h-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3165 = [
  _hoisted_2166
];
function _sfc_render166(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1166, _hoisted_3165);
}
var mic_default = export_helper_default(mic_vue_vue_type_script_lang_default, [["render", _sfc_render166], ["__file", "mic.vue"]]);
var microphone_vue_vue_type_script_lang_default = {
  name: "Microphone"
};
var _hoisted_1167 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2167 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3166 = [
  _hoisted_2167
];
function _sfc_render167(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1167, _hoisted_3166);
}
var microphone_default = export_helper_default(microphone_vue_vue_type_script_lang_default, [["render", _sfc_render167], ["__file", "microphone.vue"]]);
var milk_tea_vue_vue_type_script_lang_default = {
  name: "MilkTea"
};
var _hoisted_1168 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2168 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M416 128V96a96 96 0 0 1 96-96h128a32 32 0 1 1 0 64H512a32 32 0 0 0-32 32v32h320a96 96 0 0 1 11.712 191.296l-39.68 581.056A64 64 0 0 1 708.224 960H315.776a64 64 0 0 1-63.872-59.648l-39.616-581.056A96 96 0 0 1 224 128h192zM276.48 320l39.296 576h392.448l4.8-70.784a224.064 224.064 0 0 1 30.016-439.808L747.52 320H276.48zM224 256h576a32 32 0 1 0 0-64H224a32 32 0 0 0 0 64zm493.44 503.872 21.12-309.12a160 160 0 0 0-21.12 309.12z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3167 = [
  _hoisted_2168
];
function _sfc_render168(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1168, _hoisted_3167);
}
var milk_tea_default = export_helper_default(milk_tea_vue_vue_type_script_lang_default, [["render", _sfc_render168], ["__file", "milk-tea.vue"]]);
var minus_vue_vue_type_script_lang_default = {
  name: "Minus"
};
var _hoisted_1169 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2169 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3168 = [
  _hoisted_2169
];
function _sfc_render169(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1169, _hoisted_3168);
}
var minus_default = export_helper_default(minus_vue_vue_type_script_lang_default, [["render", _sfc_render169], ["__file", "minus.vue"]]);
var money_vue_vue_type_script_lang_default = {
  name: "Money"
};
var _hoisted_1170 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2170 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640h64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3169 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 192H128v448h640V192zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.056 29.056 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_448 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320zm0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_514 = [
  _hoisted_2170,
  _hoisted_3169,
  _hoisted_448
];
function _sfc_render170(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1170, _hoisted_514);
}
var money_default = export_helper_default(money_vue_vue_type_script_lang_default, [["render", _sfc_render170], ["__file", "money.vue"]]);
var monitor_vue_vue_type_script_lang_default = {
  name: "Monitor"
};
var _hoisted_1171 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2171 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H544zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3170 = [
  _hoisted_2171
];
function _sfc_render171(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1171, _hoisted_3170);
}
var monitor_default = export_helper_default(monitor_vue_vue_type_script_lang_default, [["render", _sfc_render171], ["__file", "monitor.vue"]]);
var moon_night_vue_vue_type_script_lang_default = {
  name: "MoonNight"
};
var _hoisted_1172 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2172 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 512a448 448 0 0 1 215.872-383.296A384 384 0 0 0 213.76 640h188.8A448.256 448.256 0 0 1 384 512zM171.136 704a448 448 0 0 1 636.992-575.296A384 384 0 0 0 499.328 704h-328.32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3171 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M32 640h960q32 0 32 32t-32 32H32q-32 0-32-32t32-32zm128 128h384a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm160 127.68 224 .256a32 32 0 0 1 32 32V928a32 32 0 0 1-32 32l-224-.384a32 32 0 0 1-32-32v-.064a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_449 = [
  _hoisted_2172,
  _hoisted_3171
];
function _sfc_render172(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1172, _hoisted_449);
}
var moon_night_default = export_helper_default(moon_night_vue_vue_type_script_lang_default, [["render", _sfc_render172], ["__file", "moon-night.vue"]]);
var moon_vue_vue_type_script_lang_default = {
  name: "Moon"
};
var _hoisted_1173 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2173 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3172 = [
  _hoisted_2173
];
function _sfc_render173(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1173, _hoisted_3172);
}
var moon_default = export_helper_default(moon_vue_vue_type_script_lang_default, [["render", _sfc_render173], ["__file", "moon.vue"]]);
var more_filled_vue_vue_type_script_lang_default = {
  name: "MoreFilled"
};
var _hoisted_1174 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2174 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3173 = [
  _hoisted_2174
];
function _sfc_render174(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1174, _hoisted_3173);
}
var more_filled_default = export_helper_default(more_filled_vue_vue_type_script_lang_default, [["render", _sfc_render174], ["__file", "more-filled.vue"]]);
var more_vue_vue_type_script_lang_default = {
  name: "More"
};
var _hoisted_1175 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2175 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3174 = [
  _hoisted_2175
];
function _sfc_render175(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1175, _hoisted_3174);
}
var more_default = export_helper_default(more_vue_vue_type_script_lang_default, [["render", _sfc_render175], ["__file", "more.vue"]]);
var mostly_cloudy_vue_vue_type_script_lang_default = {
  name: "MostlyCloudy"
};
var _hoisted_1176 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2176 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M737.216 357.952 704 349.824l-11.776-32a192.064 192.064 0 0 0-367.424 23.04l-8.96 39.04-39.04 8.96A192.064 192.064 0 0 0 320 768h368a207.808 207.808 0 0 0 207.808-208 208.32 208.32 0 0 0-158.592-202.048zm15.168-62.208A272.32 272.32 0 0 1 959.744 560a271.808 271.808 0 0 1-271.552 272H320a256 256 0 0 1-57.536-505.536 256.128 256.128 0 0 1 489.92-30.72z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3175 = [
  _hoisted_2176
];
function _sfc_render176(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1176, _hoisted_3175);
}
var mostly_cloudy_default = export_helper_default(mostly_cloudy_vue_vue_type_script_lang_default, [["render", _sfc_render176], ["__file", "mostly-cloudy.vue"]]);
var mouse_vue_vue_type_script_lang_default = {
  name: "Mouse"
};
var _hoisted_1177 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2177 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M438.144 256c-68.352 0-92.736 4.672-117.76 18.112-20.096 10.752-35.52 26.176-46.272 46.272C260.672 345.408 256 369.792 256 438.144v275.712c0 68.352 4.672 92.736 18.112 117.76 10.752 20.096 26.176 35.52 46.272 46.272C345.408 891.328 369.792 896 438.144 896h147.712c68.352 0 92.736-4.672 117.76-18.112 20.096-10.752 35.52-26.176 46.272-46.272C763.328 806.592 768 782.208 768 713.856V438.144c0-68.352-4.672-92.736-18.112-117.76a110.464 110.464 0 0 0-46.272-46.272C678.592 260.672 654.208 256 585.856 256H438.144zm0-64h147.712c85.568 0 116.608 8.96 147.904 25.6 31.36 16.768 55.872 41.344 72.576 72.64C823.104 321.536 832 352.576 832 438.08v275.84c0 85.504-8.96 116.544-25.6 147.84a174.464 174.464 0 0 1-72.64 72.576C702.464 951.104 671.424 960 585.92 960H438.08c-85.504 0-116.544-8.96-147.84-25.6a174.464 174.464 0 0 1-72.64-72.704c-16.768-31.296-25.664-62.336-25.664-147.84v-275.84c0-85.504 8.96-116.544 25.6-147.84a174.464 174.464 0 0 1 72.768-72.576c31.232-16.704 62.272-25.6 147.776-25.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3176 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 320q32 0 32 32v128q0 32-32 32t-32-32V352q0-32 32-32zm32-96a32 32 0 0 1-64 0v-64a32 32 0 0 0-32-32h-96a32 32 0 0 1 0-64h96a96 96 0 0 1 96 96v64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_450 = [
  _hoisted_2177,
  _hoisted_3176
];
function _sfc_render177(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1177, _hoisted_450);
}
var mouse_default = export_helper_default(mouse_vue_vue_type_script_lang_default, [["render", _sfc_render177], ["__file", "mouse.vue"]]);
var mug_vue_vue_type_script_lang_default = {
  name: "Mug"
};
var _hoisted_1178 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2178 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M736 800V160H160v640a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64zm64-544h63.552a96 96 0 0 1 96 96v224a96 96 0 0 1-96 96H800v128a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V128a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 64v288h63.552a32 32 0 0 0 32-32V352a32 32 0 0 0-32-32H800z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3177 = [
  _hoisted_2178
];
function _sfc_render178(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1178, _hoisted_3177);
}
var mug_default = export_helper_default(mug_vue_vue_type_script_lang_default, [["render", _sfc_render178], ["__file", "mug.vue"]]);
var mute_notification_vue_vue_type_script_lang_default = {
  name: "MuteNotification"
};
var _hoisted_1179 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2179 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m241.216 832 63.616-64H768V448c0-42.368-10.24-82.304-28.48-117.504l46.912-47.232C815.36 331.392 832 387.84 832 448v320h96a32 32 0 1 1 0 64H241.216zm-90.24 0H96a32 32 0 1 1 0-64h96V448a320.128 320.128 0 0 1 256-313.6V128a64 64 0 1 1 128 0v6.4a319.552 319.552 0 0 1 171.648 97.088l-45.184 45.44A256 256 0 0 0 256 448v278.336L151.04 832zM448 896h128a64 64 0 0 1-128 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3178 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M150.72 859.072a32 32 0 0 1-45.44-45.056l704-708.544a32 32 0 0 1 45.44 45.056l-704 708.544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_451 = [
  _hoisted_2179,
  _hoisted_3178
];
function _sfc_render179(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1179, _hoisted_451);
}
var mute_notification_default = export_helper_default(mute_notification_vue_vue_type_script_lang_default, [["render", _sfc_render179], ["__file", "mute-notification.vue"]]);
var mute_vue_vue_type_script_lang_default = {
  name: "Mute"
};
var _hoisted_1180 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2180 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m412.16 592.128-45.44 45.44A191.232 191.232 0 0 1 320 512V256a192 192 0 1 1 384 0v44.352l-64 64V256a128 128 0 1 0-256 0v256c0 30.336 10.56 58.24 28.16 80.128zm51.968 38.592A128 128 0 0 0 640 512v-57.152l64-64V512a192 192 0 0 1-287.68 166.528l47.808-47.808zM314.88 779.968l46.144-46.08A222.976 222.976 0 0 0 480 768h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64v-64c-61.44 0-118.4-19.2-165.12-52.032zM266.752 737.6A286.976 286.976 0 0 1 192 544v-32a32 32 0 0 1 64 0v32c0 56.832 21.184 108.8 56.064 148.288L266.752 737.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3179 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M150.72 859.072a32 32 0 0 1-45.44-45.056l704-708.544a32 32 0 0 1 45.44 45.056l-704 708.544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_452 = [
  _hoisted_2180,
  _hoisted_3179
];
function _sfc_render180(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1180, _hoisted_452);
}
var mute_default = export_helper_default(mute_vue_vue_type_script_lang_default, [["render", _sfc_render180], ["__file", "mute.vue"]]);
var no_smoking_vue_vue_type_script_lang_default = {
  name: "NoSmoking"
};
var _hoisted_1181 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2181 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M440.256 576H256v128h56.256l-64 64H224a32 32 0 0 1-32-32V544a32 32 0 0 1 32-32h280.256l-64 64zm143.488 128H704V583.744L775.744 512H928a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H519.744l64-64zM768 576v128h128V576H768zm-29.696-207.552 45.248 45.248-497.856 497.856-45.248-45.248zM256 64h64v320h-64zM128 192h64v192h-64zM64 512h64v256H64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3180 = [
  _hoisted_2181
];
function _sfc_render181(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1181, _hoisted_3180);
}
var no_smoking_default = export_helper_default(no_smoking_vue_vue_type_script_lang_default, [["render", _sfc_render181], ["__file", "no-smoking.vue"]]);
var notebook_vue_vue_type_script_lang_default = {
  name: "Notebook"
};
var _hoisted_1182 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2182 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3181 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_453 = [
  _hoisted_2182,
  _hoisted_3181
];
function _sfc_render182(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1182, _hoisted_453);
}
var notebook_default = export_helper_default(notebook_vue_vue_type_script_lang_default, [["render", _sfc_render182], ["__file", "notebook.vue"]]);
var notification_vue_vue_type_script_lang_default = {
  name: "Notification"
};
var _hoisted_1183 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2183 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 128v64H256a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V512h64v256a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3182 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 384a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_454 = [
  _hoisted_2183,
  _hoisted_3182
];
function _sfc_render183(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1183, _hoisted_454);
}
var notification_default = export_helper_default(notification_vue_vue_type_script_lang_default, [["render", _sfc_render183], ["__file", "notification.vue"]]);
var odometer_vue_vue_type_script_lang_default = {
  name: "Odometer"
};
var _hoisted_1184 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2184 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3183 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 512a320 320 0 1 1 640 0 32 32 0 1 1-64 0 256 256 0 1 0-512 0 32 32 0 0 1-64 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_455 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M570.432 627.84A96 96 0 1 1 509.568 608l60.992-187.776A32 32 0 1 1 631.424 440l-60.992 187.776zM502.08 734.464a32 32 0 1 0 19.84-60.928 32 32 0 0 0-19.84 60.928z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_515 = [
  _hoisted_2184,
  _hoisted_3183,
  _hoisted_455
];
function _sfc_render184(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1184, _hoisted_515);
}
var odometer_default = export_helper_default(odometer_vue_vue_type_script_lang_default, [["render", _sfc_render184], ["__file", "odometer.vue"]]);
var office_building_vue_vue_type_script_lang_default = {
  name: "OfficeBuilding"
};
var _hoisted_1185 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2185 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3184 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_456 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_516 = [
  _hoisted_2185,
  _hoisted_3184,
  _hoisted_456
];
function _sfc_render185(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1185, _hoisted_516);
}
var office_building_default = export_helper_default(office_building_vue_vue_type_script_lang_default, [["render", _sfc_render185], ["__file", "office-building.vue"]]);
var open_vue_vue_type_script_lang_default = {
  name: "Open"
};
var _hoisted_1186 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2186 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724H329.956zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3185 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M694.044 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454zm0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_457 = [
  _hoisted_2186,
  _hoisted_3185
];
function _sfc_render186(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1186, _hoisted_457);
}
var open_default = export_helper_default(open_vue_vue_type_script_lang_default, [["render", _sfc_render186], ["__file", "open.vue"]]);
var operation_vue_vue_type_script_lang_default = {
  name: "Operation"
};
var _hoisted_1187 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2187 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3186 = [
  _hoisted_2187
];
function _sfc_render187(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1187, _hoisted_3186);
}
var operation_default = export_helper_default(operation_vue_vue_type_script_lang_default, [["render", _sfc_render187], ["__file", "operation.vue"]]);
var opportunity_vue_vue_type_script_lang_default = {
  name: "Opportunity"
};
var _hoisted_1188 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2188 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 960v-64h192.064v64H384zm448-544a350.656 350.656 0 0 1-128.32 271.424C665.344 719.04 640 763.776 640 813.504V832H320v-14.336c0-48-19.392-95.36-57.216-124.992a351.552 351.552 0 0 1-128.448-344.256c25.344-136.448 133.888-248.128 269.76-276.48A352.384 352.384 0 0 1 832 416zm-544 32c0-132.288 75.904-224 192-224v-64c-154.432 0-256 122.752-256 288h64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3187 = [
  _hoisted_2188
];
function _sfc_render188(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1188, _hoisted_3187);
}
var opportunity_default = export_helper_default(opportunity_vue_vue_type_script_lang_default, [["render", _sfc_render188], ["__file", "opportunity.vue"]]);
var orange_vue_vue_type_script_lang_default = {
  name: "Orange"
};
var _hoisted_1189 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2189 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 894.72a382.336 382.336 0 0 0 215.936-89.472L577.024 622.272c-10.24 6.016-21.248 10.688-33.024 13.696v258.688zm261.248-134.784A382.336 382.336 0 0 0 894.656 544H635.968c-3.008 11.776-7.68 22.848-13.696 33.024l182.976 182.912zM894.656 480a382.336 382.336 0 0 0-89.408-215.936L622.272 446.976c6.016 10.24 10.688 21.248 13.696 33.024h258.688zm-134.72-261.248A382.336 382.336 0 0 0 544 129.344v258.688c11.776 3.008 22.848 7.68 33.024 13.696l182.912-182.976zM480 129.344a382.336 382.336 0 0 0-215.936 89.408l182.912 182.976c10.24-6.016 21.248-10.688 33.024-13.696V129.344zm-261.248 134.72A382.336 382.336 0 0 0 129.344 480h258.688c3.008-11.776 7.68-22.848 13.696-33.024L218.752 264.064zM129.344 544a382.336 382.336 0 0 0 89.408 215.936l182.976-182.912A127.232 127.232 0 0 1 388.032 544H129.344zm134.72 261.248A382.336 382.336 0 0 0 480 894.656V635.968a127.232 127.232 0 0 1-33.024-13.696L264.064 805.248zM512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896zm0-384a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3188 = [
  _hoisted_2189
];
function _sfc_render189(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1189, _hoisted_3188);
}
var orange_default = export_helper_default(orange_vue_vue_type_script_lang_default, [["render", _sfc_render189], ["__file", "orange.vue"]]);
var paperclip_vue_vue_type_script_lang_default = {
  name: "Paperclip"
};
var _hoisted_1190 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2190 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M602.496 240.448A192 192 0 1 1 874.048 512l-316.8 316.8A256 256 0 0 1 195.2 466.752L602.496 59.456l45.248 45.248L240.448 512A192 192 0 0 0 512 783.552l316.8-316.8a128 128 0 1 0-181.056-181.056L353.6 579.904a32 32 0 1 0 45.248 45.248l294.144-294.144 45.312 45.248L444.096 670.4a96 96 0 1 1-135.744-135.744l294.144-294.208z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3189 = [
  _hoisted_2190
];
function _sfc_render190(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1190, _hoisted_3189);
}
var paperclip_default = export_helper_default(paperclip_vue_vue_type_script_lang_default, [["render", _sfc_render190], ["__file", "paperclip.vue"]]);
var partly_cloudy_vue_vue_type_script_lang_default = {
  name: "PartlyCloudy"
};
var _hoisted_1191 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2191 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M598.4 895.872H328.192a256 256 0 0 1-34.496-510.528A352 352 0 1 1 598.4 895.872zm-271.36-64h272.256a288 288 0 1 0-248.512-417.664L335.04 445.44l-34.816 3.584a192 192 0 0 0 26.88 382.848z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3190 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M139.84 501.888a256 256 0 1 1 417.856-277.12c-17.728 2.176-38.208 8.448-61.504 18.816A192 192 0 1 0 189.12 460.48a6003.84 6003.84 0 0 0-49.28 41.408z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_458 = [
  _hoisted_2191,
  _hoisted_3190
];
function _sfc_render191(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1191, _hoisted_458);
}
var partly_cloudy_default = export_helper_default(partly_cloudy_vue_vue_type_script_lang_default, [["render", _sfc_render191], ["__file", "partly-cloudy.vue"]]);
var pear_vue_vue_type_script_lang_default = {
  name: "Pear"
};
var _hoisted_1192 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2192 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M542.336 258.816a443.255 443.255 0 0 0-9.024 25.088 32 32 0 1 1-60.8-20.032l1.088-3.328a162.688 162.688 0 0 0-122.048 131.392l-17.088 102.72-20.736 15.36C256.192 552.704 224 610.88 224 672c0 120.576 126.4 224 288 224s288-103.424 288-224c0-61.12-32.192-119.296-89.728-161.92l-20.736-15.424-17.088-102.72a162.688 162.688 0 0 0-130.112-133.12zm-40.128-66.56c7.936-15.552 16.576-30.08 25.92-43.776 23.296-33.92 49.408-59.776 78.528-77.12a32 32 0 1 1 32.704 55.04c-20.544 12.224-40.064 31.552-58.432 58.304a316.608 316.608 0 0 0-9.792 15.104 226.688 226.688 0 0 1 164.48 181.568l12.8 77.248C819.456 511.36 864 587.392 864 672c0 159.04-157.568 288-352 288S160 831.04 160 672c0-84.608 44.608-160.64 115.584-213.376l12.8-77.248a226.624 226.624 0 0 1 213.76-189.184z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3191 = [
  _hoisted_2192
];
function _sfc_render192(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1192, _hoisted_3191);
}
var pear_default = export_helper_default(pear_vue_vue_type_script_lang_default, [["render", _sfc_render192], ["__file", "pear.vue"]]);
var phone_filled_vue_vue_type_script_lang_default = {
  name: "PhoneFilled"
};
var _hoisted_1193 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2193 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M199.232 125.568 90.624 379.008a32 32 0 0 0 6.784 35.2l512.384 512.384a32 32 0 0 0 35.2 6.784l253.44-108.608a32 32 0 0 0 10.048-52.032L769.6 633.92a32 32 0 0 0-36.928-5.952l-130.176 65.088-271.488-271.552 65.024-130.176a32 32 0 0 0-5.952-36.928L251.2 115.52a32 32 0 0 0-51.968 10.048z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3192 = [
  _hoisted_2193
];
function _sfc_render193(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1193, _hoisted_3192);
}
var phone_filled_default = export_helper_default(phone_filled_vue_vue_type_script_lang_default, [["render", _sfc_render193], ["__file", "phone-filled.vue"]]);
var phone_vue_vue_type_script_lang_default = {
  name: "Phone"
};
var _hoisted_1194 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2194 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M79.36 432.256 591.744 944.64a32 32 0 0 0 35.2 6.784l253.44-108.544a32 32 0 0 0 9.984-52.032l-153.856-153.92a32 32 0 0 0-36.928-6.016l-69.888 34.944L358.08 394.24l35.008-69.888a32 32 0 0 0-5.952-36.928L233.152 133.568a32 32 0 0 0-52.032 10.048L72.512 397.056a32 32 0 0 0 6.784 35.2zm60.48-29.952 81.536-190.08L325.568 316.48l-24.64 49.216-20.608 41.216 32.576 32.64 271.552 271.552 32.64 32.64 41.216-20.672 49.28-24.576 104.192 104.128-190.08 81.472L139.84 402.304zM512 320v-64a256 256 0 0 1 256 256h-64a192 192 0 0 0-192-192zm0-192V64a448 448 0 0 1 448 448h-64a384 384 0 0 0-384-384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3193 = [
  _hoisted_2194
];
function _sfc_render194(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1194, _hoisted_3193);
}
var phone_default = export_helper_default(phone_vue_vue_type_script_lang_default, [["render", _sfc_render194], ["__file", "phone.vue"]]);
var picture_filled_vue_vue_type_script_lang_default = {
  name: "PictureFilled"
};
var _hoisted_1195 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2195 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H96zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112zM256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3194 = [
  _hoisted_2195
];
function _sfc_render195(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1195, _hoisted_3194);
}
var picture_filled_default = export_helper_default(picture_filled_vue_vue_type_script_lang_default, [["render", _sfc_render195], ["__file", "picture-filled.vue"]]);
var picture_rounded_vue_vue_type_script_lang_default = {
  name: "PictureRounded"
};
var _hoisted_1196 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2196 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0-64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3195 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM214.656 790.656l-45.312-45.312 185.664-185.6a96 96 0 0 1 123.712-10.24l138.24 98.688a32 32 0 0 0 39.872-2.176L906.688 422.4l42.624 47.744L699.52 693.696a96 96 0 0 1-119.808 6.592l-138.24-98.752a32 32 0 0 0-41.152 3.456l-185.664 185.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_459 = [
  _hoisted_2196,
  _hoisted_3195
];
function _sfc_render196(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1196, _hoisted_459);
}
var picture_rounded_default = export_helper_default(picture_rounded_vue_vue_type_script_lang_default, [["render", _sfc_render196], ["__file", "picture-rounded.vue"]]);
var picture_vue_vue_type_script_lang_default = {
  name: "Picture"
};
var _hoisted_1197 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2197 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3196 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_460 = [
  _hoisted_2197,
  _hoisted_3196
];
function _sfc_render197(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1197, _hoisted_460);
}
var picture_default = export_helper_default(picture_vue_vue_type_script_lang_default, [["render", _sfc_render197], ["__file", "picture.vue"]]);
var pie_chart_vue_vue_type_script_lang_default = {
  name: "PieChart"
};
var _hoisted_1198 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2198 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3197 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512V64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_461 = [
  _hoisted_2198,
  _hoisted_3197
];
function _sfc_render198(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1198, _hoisted_461);
}
var pie_chart_default = export_helper_default(pie_chart_vue_vue_type_script_lang_default, [["render", _sfc_render198], ["__file", "pie-chart.vue"]]);
var place_vue_vue_type_script_lang_default = {
  name: "Place"
};
var _hoisted_1199 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2199 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3198 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 512a32 32 0 0 1 32 32v256a32 32 0 1 1-64 0V544a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_462 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 649.088v64.96C269.76 732.352 192 771.904 192 800c0 37.696 139.904 96 320 96s320-58.304 320-96c0-28.16-77.76-67.648-192-85.952v-64.96C789.12 671.04 896 730.368 896 800c0 88.32-171.904 160-384 160s-384-71.68-384-160c0-69.696 106.88-128.96 256-150.912z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_517 = [
  _hoisted_2199,
  _hoisted_3198,
  _hoisted_462
];
function _sfc_render199(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1199, _hoisted_517);
}
var place_default = export_helper_default(place_vue_vue_type_script_lang_default, [["render", _sfc_render199], ["__file", "place.vue"]]);
var platform_vue_vue_type_script_lang_default = {
  name: "Platform"
};
var _hoisted_1200 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2200 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 832v-64h128v64h192v64H256v-64h192zM128 704V128h768v576H128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3199 = [
  _hoisted_2200
];
function _sfc_render200(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1200, _hoisted_3199);
}
var platform_default = export_helper_default(platform_vue_vue_type_script_lang_default, [["render", _sfc_render200], ["__file", "platform.vue"]]);
var plus_vue_vue_type_script_lang_default = {
  name: "Plus"
};
var _hoisted_1201 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2201 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3200 = [
  _hoisted_2201
];
function _sfc_render201(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1201, _hoisted_3200);
}
var plus_default = export_helper_default(plus_vue_vue_type_script_lang_default, [["render", _sfc_render201], ["__file", "plus.vue"]]);
var pointer_vue_vue_type_script_lang_default = {
  name: "Pointer"
};
var _hoisted_1202 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2202 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M511.552 128c-35.584 0-64.384 28.8-64.384 64.448v516.48L274.048 570.88a94.272 94.272 0 0 0-112.896-3.456 44.416 44.416 0 0 0-8.96 62.208L332.8 870.4A64 64 0 0 0 384 896h512V575.232a64 64 0 0 0-45.632-61.312l-205.952-61.76A96 96 0 0 1 576 360.192V192.448C576 156.8 547.2 128 511.552 128zM359.04 556.8l24.128 19.2V192.448a128.448 128.448 0 1 1 256.832 0v167.744a32 32 0 0 0 22.784 30.656l206.016 61.76A128 128 0 0 1 960 575.232V896a64 64 0 0 1-64 64H384a128 128 0 0 1-102.4-51.2L101.056 668.032A108.416 108.416 0 0 1 128 512.512a158.272 158.272 0 0 1 185.984 8.32L359.04 556.8z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3201 = [
  _hoisted_2202
];
function _sfc_render202(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1202, _hoisted_3201);
}
var pointer_default = export_helper_default(pointer_vue_vue_type_script_lang_default, [["render", _sfc_render202], ["__file", "pointer.vue"]]);
var position_vue_vue_type_script_lang_default = {
  name: "Position"
};
var _hoisted_1203 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2203 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m249.6 417.088 319.744 43.072 39.168 310.272L845.12 178.88 249.6 417.088zm-129.024 47.168a32 32 0 0 1-7.68-61.44l777.792-311.04a32 32 0 0 1 41.6 41.6l-310.336 775.68a32 32 0 0 1-61.44-7.808L512 516.992l-391.424-52.736z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3202 = [
  _hoisted_2203
];
function _sfc_render203(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1203, _hoisted_3202);
}
var position_default = export_helper_default(position_vue_vue_type_script_lang_default, [["render", _sfc_render203], ["__file", "position.vue"]]);
var postcard_vue_vue_type_script_lang_default = {
  name: "Postcard"
};
var _hoisted_1204 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2204 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 224a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32V256a32 32 0 0 0-32-32H160zm0-64h704a96 96 0 0 1 96 96v512a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V256a96 96 0 0 1 96-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3203 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 320a64 64 0 1 1 0 128 64 64 0 0 1 0-128zM288 448h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32zm0 128h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_463 = [
  _hoisted_2204,
  _hoisted_3203
];
function _sfc_render204(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1204, _hoisted_463);
}
var postcard_default = export_helper_default(postcard_vue_vue_type_script_lang_default, [["render", _sfc_render204], ["__file", "postcard.vue"]]);
var pouring_vue_vue_type_script_lang_default = {
  name: "Pouring"
};
var _hoisted_1205 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2205 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m739.328 291.328-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 97.28 78.72 175.936 175.808 175.936h400a192 192 0 0 0 35.776-380.672zM959.552 480a256 256 0 0 1-256 256h-400A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 959.552 480zM224 800a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3204 = [
  _hoisted_2205
];
function _sfc_render205(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1205, _hoisted_3204);
}
var pouring_default = export_helper_default(pouring_vue_vue_type_script_lang_default, [["render", _sfc_render205], ["__file", "pouring.vue"]]);
var present_vue_vue_type_script_lang_default = {
  name: "Present"
};
var _hoisted_1206 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2206 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 896V640H192v-64h288V320H192v576h288zm64 0h288V320H544v256h288v64H544v256zM128 256h768v672a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3205 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M96 256h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_464 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M416 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_518 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M608 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_6 = [
  _hoisted_2206,
  _hoisted_3205,
  _hoisted_464,
  _hoisted_518
];
function _sfc_render206(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1206, _hoisted_6);
}
var present_default = export_helper_default(present_vue_vue_type_script_lang_default, [["render", _sfc_render206], ["__file", "present.vue"]]);
var price_tag_vue_vue_type_script_lang_default = {
  name: "PriceTag"
};
var _hoisted_1207 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2207 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 318.336V896h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0L224 318.336zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3206 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_465 = [
  _hoisted_2207,
  _hoisted_3206
];
function _sfc_render207(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1207, _hoisted_465);
}
var price_tag_default = export_helper_default(price_tag_vue_vue_type_script_lang_default, [["render", _sfc_render207], ["__file", "price-tag.vue"]]);
var printer_vue_vue_type_script_lang_default = {
  name: "Printer"
};
var _hoisted_1208 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2208 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 768H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 746.432 64 741.248 64 727.04V379.072c0-42.816 4.48-58.304 12.8-73.984 8.384-15.616 20.672-27.904 36.288-36.288 15.68-8.32 31.168-12.8 73.984-12.8H256V64h512v192h68.928c42.816 0 58.304 4.48 73.984 12.8 15.616 8.384 27.904 20.672 36.288 36.288 8.32 15.68 12.8 31.168 12.8 73.984v347.904c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H768v192H256V768zm64-192v320h384V576H320zm-64 128V512h512v192h128V379.072c0-29.376-1.408-36.48-5.248-43.776a23.296 23.296 0 0 0-10.048-10.048c-7.232-3.84-14.4-5.248-43.776-5.248H187.072c-29.376 0-36.48 1.408-43.776 5.248a23.296 23.296 0 0 0-10.048 10.048c-3.84 7.232-5.248 14.4-5.248 43.776V704h128zm64-448h384V128H320v128zm-64 128h64v64h-64v-64zm128 0h64v64h-64v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3207 = [
  _hoisted_2208
];
function _sfc_render208(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1208, _hoisted_3207);
}
var printer_default = export_helper_default(printer_vue_vue_type_script_lang_default, [["render", _sfc_render208], ["__file", "printer.vue"]]);
var promotion_vue_vue_type_script_lang_default = {
  name: "Promotion"
};
var _hoisted_1209 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2209 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472 64 448zm256 512V657.024L512 768 320 960z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3208 = [
  _hoisted_2209
];
function _sfc_render209(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1209, _hoisted_3208);
}
var promotion_default = export_helper_default(promotion_vue_vue_type_script_lang_default, [["render", _sfc_render209], ["__file", "promotion.vue"]]);
var quartz_watch_vue_vue_type_script_lang_default = {
  name: "QuartzWatch"
};
var _hoisted_1210 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2210 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M422.02 602.01v-.03c-6.68-5.99-14.35-8.83-23.01-8.51-8.67.32-16.17 3.66-22.5 10.02-6.33 6.36-9.5 13.7-9.5 22.02s3 15.82 8.99 22.5c8.68 8.68 19.02 11.35 31.01 8s19.49-10.85 22.5-22.5c3.01-11.65.51-22.15-7.49-31.49v-.01zM384 512c0-9.35-3-17.02-8.99-23.01-6-5.99-13.66-8.99-23.01-8.99-9.35 0-17.02 3-23.01 8.99-5.99 6-8.99 13.66-8.99 23.01s3 17.02 8.99 23.01c6 5.99 13.66 8.99 23.01 8.99 9.35 0 17.02-3 23.01-8.99 5.99-6 8.99-13.67 8.99-23.01zm6.53-82.49c11.65 3.01 22.15.51 31.49-7.49h.04c5.99-6.68 8.83-14.34 8.51-23.01-.32-8.67-3.66-16.16-10.02-22.5-6.36-6.33-13.7-9.5-22.02-9.5s-15.82 3-22.5 8.99c-8.68 8.69-11.35 19.02-8 31.01 3.35 11.99 10.85 19.49 22.5 22.5zm242.94 0c11.67-3.03 19.01-10.37 22.02-22.02 3.01-11.65.51-22.15-7.49-31.49h.01c-6.68-5.99-14.18-8.99-22.5-8.99s-15.66 3.16-22.02 9.5c-6.36 6.34-9.7 13.84-10.02 22.5-.32 8.66 2.52 16.33 8.51 23.01 9.32 8.02 19.82 10.52 31.49 7.49zM512 640c-9.35 0-17.02 3-23.01 8.99-5.99 6-8.99 13.66-8.99 23.01s3 17.02 8.99 23.01c6 5.99 13.67 8.99 23.01 8.99 9.35 0 17.02-3 23.01-8.99 5.99-6 8.99-13.66 8.99-23.01s-3-17.02-8.99-23.01c-6-5.99-13.66-8.99-23.01-8.99zm183.01-151.01c-6-5.99-13.66-8.99-23.01-8.99s-17.02 3-23.01 8.99c-5.99 6-8.99 13.66-8.99 23.01s3 17.02 8.99 23.01c6 5.99 13.66 8.99 23.01 8.99s17.02-3 23.01-8.99c5.99-6 8.99-13.67 8.99-23.01 0-9.35-3-17.02-8.99-23.01z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3209 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 512c-2-90.67-33.17-166.17-93.5-226.5-20.43-20.42-42.6-37.49-66.5-51.23V64H352v170.26c-23.9 13.74-46.07 30.81-66.5 51.24-60.33 60.33-91.49 135.83-93.5 226.5 2 90.67 33.17 166.17 93.5 226.5 20.43 20.43 42.6 37.5 66.5 51.24V960h320V789.74c23.9-13.74 46.07-30.81 66.5-51.24 60.33-60.34 91.49-135.83 93.5-226.5zM416 128h192v78.69c-29.85-9.03-61.85-13.93-96-14.69-34.15.75-66.15 5.65-96 14.68V128zm192 768H416v-78.68c29.85 9.03 61.85 13.93 96 14.68 34.15-.75 66.15-5.65 96-14.68V896zm-96-128c-72.66-2.01-132.99-27.01-180.99-75.01S258.01 584.66 256 512c2.01-72.66 27.01-132.99 75.01-180.99S439.34 258.01 512 256c72.66 2.01 132.99 27.01 180.99 75.01S765.99 439.34 768 512c-2.01 72.66-27.01 132.99-75.01 180.99S584.66 765.99 512 768z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_466 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 320c-9.35 0-17.02 3-23.01 8.99-5.99 6-8.99 13.66-8.99 23.01 0 9.35 3 17.02 8.99 23.01 6 5.99 13.67 8.99 23.01 8.99 9.35 0 17.02-3 23.01-8.99 5.99-6 8.99-13.66 8.99-23.01 0-9.35-3-17.02-8.99-23.01-6-5.99-13.66-8.99-23.01-8.99zm112.99 273.5c-8.66-.32-16.33 2.52-23.01 8.51-7.98 9.32-10.48 19.82-7.49 31.49s10.49 19.17 22.5 22.5 22.35.66 31.01-8v.04c5.99-6.68 8.99-14.18 8.99-22.5s-3.16-15.66-9.5-22.02-13.84-9.7-22.5-10.02z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_519 = [
  _hoisted_2210,
  _hoisted_3209,
  _hoisted_466
];
function _sfc_render210(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1210, _hoisted_519);
}
var quartz_watch_default = export_helper_default(quartz_watch_vue_vue_type_script_lang_default, [["render", _sfc_render210], ["__file", "quartz-watch.vue"]]);
var question_filled_vue_vue_type_script_lang_default = {
  name: "QuestionFilled"
};
var _hoisted_1211 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2211 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3210 = [
  _hoisted_2211
];
function _sfc_render211(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1211, _hoisted_3210);
}
var question_filled_default = export_helper_default(question_filled_vue_vue_type_script_lang_default, [["render", _sfc_render211], ["__file", "question-filled.vue"]]);
var rank_vue_vue_type_script_lang_default = {
  name: "Rank"
};
var _hoisted_1212 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2212 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m186.496 544 41.408 41.344a32 32 0 1 1-45.248 45.312l-96-96a32 32 0 0 1 0-45.312l96-96a32 32 0 1 1 45.248 45.312L186.496 480h290.816V186.432l-41.472 41.472a32 32 0 1 1-45.248-45.184l96-96.128a32 32 0 0 1 45.312 0l96 96.064a32 32 0 0 1-45.248 45.184l-41.344-41.28V480H832l-41.344-41.344a32 32 0 0 1 45.248-45.312l96 96a32 32 0 0 1 0 45.312l-96 96a32 32 0 0 1-45.248-45.312L832 544H541.312v293.44l41.344-41.28a32 32 0 1 1 45.248 45.248l-96 96a32 32 0 0 1-45.312 0l-96-96a32 32 0 1 1 45.312-45.248l41.408 41.408V544H186.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3211 = [
  _hoisted_2212
];
function _sfc_render212(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1212, _hoisted_3211);
}
var rank_default = export_helper_default(rank_vue_vue_type_script_lang_default, [["render", _sfc_render212], ["__file", "rank.vue"]]);
var reading_lamp_vue_vue_type_script_lang_default = {
  name: "ReadingLamp"
};
var _hoisted_1213 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2213 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 896h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm-44.672-768-99.52 448h608.384l-99.52-448H307.328zm-25.6-64h460.608a32 32 0 0 1 31.232 25.088l113.792 512A32 32 0 0 1 856.128 640H167.872a32 32 0 0 1-31.232-38.912l113.792-512A32 32 0 0 1 281.664 64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3212 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M672 576q32 0 32 32v128q0 32-32 32t-32-32V608q0-32 32-32zm-192-.064h64V960h-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_467 = [
  _hoisted_2213,
  _hoisted_3212
];
function _sfc_render213(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1213, _hoisted_467);
}
var reading_lamp_default = export_helper_default(reading_lamp_vue_vue_type_script_lang_default, [["render", _sfc_render213], ["__file", "reading-lamp.vue"]]);
var reading_vue_vue_type_script_lang_default = {
  name: "Reading"
};
var _hoisted_1214 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2214 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3213 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 192h64v704h-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_468 = [
  _hoisted_2214,
  _hoisted_3213
];
function _sfc_render214(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1214, _hoisted_468);
}
var reading_default = export_helper_default(reading_vue_vue_type_script_lang_default, [["render", _sfc_render214], ["__file", "reading.vue"]]);
var refresh_left_vue_vue_type_script_lang_default = {
  name: "RefreshLeft"
};
var _hoisted_1215 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2215 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3214 = [
  _hoisted_2215
];
function _sfc_render215(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1215, _hoisted_3214);
}
var refresh_left_default = export_helper_default(refresh_left_vue_vue_type_script_lang_default, [["render", _sfc_render215], ["__file", "refresh-left.vue"]]);
var refresh_right_vue_vue_type_script_lang_default = {
  name: "RefreshRight"
};
var _hoisted_1216 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2216 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3215 = [
  _hoisted_2216
];
function _sfc_render216(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1216, _hoisted_3215);
}
var refresh_right_default = export_helper_default(refresh_right_vue_vue_type_script_lang_default, [["render", _sfc_render216], ["__file", "refresh-right.vue"]]);
var refresh_vue_vue_type_script_lang_default = {
  name: "Refresh"
};
var _hoisted_1217 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2217 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3216 = [
  _hoisted_2217
];
function _sfc_render217(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1217, _hoisted_3216);
}
var refresh_default = export_helper_default(refresh_vue_vue_type_script_lang_default, [["render", _sfc_render217], ["__file", "refresh.vue"]]);
var refrigerator_vue_vue_type_script_lang_default = {
  name: "Refrigerator"
};
var _hoisted_1218 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2218 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 448h512V160a32 32 0 0 0-32-32H288a32 32 0 0 0-32 32v288zm0 64v352a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V512H256zm32-448h448a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H288a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zm32 224h64v96h-64v-96zm0 288h64v96h-64v-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3217 = [
  _hoisted_2218
];
function _sfc_render218(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1218, _hoisted_3217);
}
var refrigerator_default = export_helper_default(refrigerator_vue_vue_type_script_lang_default, [["render", _sfc_render218], ["__file", "refrigerator.vue"]]);
var remove_filled_vue_vue_type_script_lang_default = {
  name: "RemoveFilled"
};
var _hoisted_1219 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2219 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zM288 512a38.4 38.4 0 0 0 38.4 38.4h371.2a38.4 38.4 0 0 0 0-76.8H326.4A38.4 38.4 0 0 0 288 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3218 = [
  _hoisted_2219
];
function _sfc_render219(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1219, _hoisted_3218);
}
var remove_filled_default = export_helper_default(remove_filled_vue_vue_type_script_lang_default, [["render", _sfc_render219], ["__file", "remove-filled.vue"]]);
var remove_vue_vue_type_script_lang_default = {
  name: "Remove"
};
var _hoisted_1220 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2220 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3219 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_469 = [
  _hoisted_2220,
  _hoisted_3219
];
function _sfc_render220(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1220, _hoisted_469);
}
var remove_default = export_helper_default(remove_vue_vue_type_script_lang_default, [["render", _sfc_render220], ["__file", "remove.vue"]]);
var right_vue_vue_type_script_lang_default = {
  name: "Right"
};
var _hoisted_1221 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2221 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3220 = [
  _hoisted_2221
];
function _sfc_render221(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1221, _hoisted_3220);
}
var right_default = export_helper_default(right_vue_vue_type_script_lang_default, [["render", _sfc_render221], ["__file", "right.vue"]]);
var scale_to_original_vue_vue_type_script_lang_default = {
  name: "ScaleToOriginal"
};
var _hoisted_1222 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2222 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zM512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412zM512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3221 = [
  _hoisted_2222
];
function _sfc_render222(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1222, _hoisted_3221);
}
var scale_to_original_default = export_helper_default(scale_to_original_vue_vue_type_script_lang_default, [["render", _sfc_render222], ["__file", "scale-to-original.vue"]]);
var school_vue_vue_type_script_lang_default = {
  name: "School"
};
var _hoisted_1223 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2223 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 128v704h576V128H224zm-32-64h640a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3222 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M64 832h896v64H64zm256-640h128v96H320z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_470 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 832h256v-64a128 128 0 1 0-256 0v64zm128-256a192 192 0 0 1 192 192v128H320V768a192 192 0 0 1 192-192zM320 384h128v96H320zm256-192h128v96H576zm0 192h128v96H576z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_520 = [
  _hoisted_2223,
  _hoisted_3222,
  _hoisted_470
];
function _sfc_render223(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1223, _hoisted_520);
}
var school_default = export_helper_default(school_vue_vue_type_script_lang_default, [["render", _sfc_render223], ["__file", "school.vue"]]);
var scissor_vue_vue_type_script_lang_default = {
  name: "Scissor"
};
var _hoisted_1224 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2224 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m512.064 578.368-106.88 152.768a160 160 0 1 1-23.36-78.208L472.96 522.56 196.864 128.256a32 32 0 1 1 52.48-36.736l393.024 561.344a160 160 0 1 1-23.36 78.208l-106.88-152.704zm54.4-189.248 208.384-297.6a32 32 0 0 1 52.48 36.736l-221.76 316.672-39.04-55.808zm-376.32 425.856a96 96 0 1 0 110.144-157.248 96 96 0 0 0-110.08 157.248zm643.84 0a96 96 0 1 0-110.08-157.248 96 96 0 0 0 110.08 157.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3223 = [
  _hoisted_2224
];
function _sfc_render224(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1224, _hoisted_3223);
}
var scissor_default = export_helper_default(scissor_vue_vue_type_script_lang_default, [["render", _sfc_render224], ["__file", "scissor.vue"]]);
var search_vue_vue_type_script_lang_default = {
  name: "Search"
};
var _hoisted_1225 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2225 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3224 = [
  _hoisted_2225
];
function _sfc_render225(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1225, _hoisted_3224);
}
var search_default = export_helper_default(search_vue_vue_type_script_lang_default, [["render", _sfc_render225], ["__file", "search.vue"]]);
var select_vue_vue_type_script_lang_default = {
  name: "Select"
};
var _hoisted_1226 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2226 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3225 = [
  _hoisted_2226
];
function _sfc_render226(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1226, _hoisted_3225);
}
var select_default = export_helper_default(select_vue_vue_type_script_lang_default, [["render", _sfc_render226], ["__file", "select.vue"]]);
var sell_vue_vue_type_script_lang_default = {
  name: "Sell"
};
var _hoisted_1227 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2227 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3226 = [
  _hoisted_2227
];
function _sfc_render227(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1227, _hoisted_3226);
}
var sell_default = export_helper_default(sell_vue_vue_type_script_lang_default, [["render", _sfc_render227], ["__file", "sell.vue"]]);
var semi_select_vue_vue_type_script_lang_default = {
  name: "SemiSelect"
};
var _hoisted_1228 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2228 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3227 = [
  _hoisted_2228
];
function _sfc_render228(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1228, _hoisted_3227);
}
var semi_select_default = export_helper_default(semi_select_vue_vue_type_script_lang_default, [["render", _sfc_render228], ["__file", "semi-select.vue"]]);
var service_vue_vue_type_script_lang_default = {
  name: "Service"
};
var _hoisted_1229 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2229 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.064 192.064 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193.235 193.235 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0zM256 448a128 128 0 1 0 0 256V448zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3228 = [
  _hoisted_2229
];
function _sfc_render229(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1229, _hoisted_3228);
}
var service_default = export_helper_default(service_vue_vue_type_script_lang_default, [["render", _sfc_render229], ["__file", "service.vue"]]);
var set_up_vue_vue_type_script_lang_default = {
  name: "SetUp"
};
var _hoisted_1230 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2230 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 160a64 64 0 0 0-64 64v576a64 64 0 0 0 64 64h576a64 64 0 0 0 64-64V224a64 64 0 0 0-64-64H224zm0-64h576a128 128 0 0 1 128 128v576a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V224A128 128 0 0 1 224 96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3229 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_471 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 320h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32zm160 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_521 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 640h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_62 = [
  _hoisted_2230,
  _hoisted_3229,
  _hoisted_471,
  _hoisted_521
];
function _sfc_render230(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1230, _hoisted_62);
}
var set_up_default = export_helper_default(set_up_vue_vue_type_script_lang_default, [["render", _sfc_render230], ["__file", "set-up.vue"]]);
var setting_vue_vue_type_script_lang_default = {
  name: "Setting"
};
var _hoisted_1231 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2231 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3230 = [
  _hoisted_2231
];
function _sfc_render231(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1231, _hoisted_3230);
}
var setting_default = export_helper_default(setting_vue_vue_type_script_lang_default, [["render", _sfc_render231], ["__file", "setting.vue"]]);
var share_vue_vue_type_script_lang_default = {
  name: "Share"
};
var _hoisted_1232 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2232 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m679.872 348.8-301.76 188.608a127.808 127.808 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3231 = [
  _hoisted_2232
];
function _sfc_render232(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1232, _hoisted_3231);
}
var share_default = export_helper_default(share_vue_vue_type_script_lang_default, [["render", _sfc_render232], ["__file", "share.vue"]]);
var ship_vue_vue_type_script_lang_default = {
  name: "Ship"
};
var _hoisted_1233 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2233 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 386.88V448h405.568a32 32 0 0 1 30.72 40.768l-76.48 267.968A192 192 0 0 1 687.168 896H336.832a192 192 0 0 1-184.64-139.264L75.648 488.768A32 32 0 0 1 106.368 448H448V117.888a32 32 0 0 1 47.36-28.096l13.888 7.616L512 96v2.88l231.68 126.4a32 32 0 0 1-2.048 57.216L512 386.88zm0-70.272 144.768-65.792L512 171.84v144.768zM512 512H148.864l18.24 64H856.96l18.24-64H512zM185.408 640l28.352 99.2A128 128 0 0 0 336.832 832h350.336a128 128 0 0 0 123.072-92.8l28.352-99.2H185.408z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3232 = [
  _hoisted_2233
];
function _sfc_render233(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1233, _hoisted_3232);
}
var ship_default = export_helper_default(ship_vue_vue_type_script_lang_default, [["render", _sfc_render233], ["__file", "ship.vue"]]);
var shop_vue_vue_type_script_lang_default = {
  name: "Shop"
};
var _hoisted_1234 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2234 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 704h64v192H256V704h64v64h384v-64zm188.544-152.192C894.528 559.616 896 567.616 896 576a96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0c0-8.384 1.408-16.384 3.392-24.192L192 128h640l60.544 423.808z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3233 = [
  _hoisted_2234
];
function _sfc_render234(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1234, _hoisted_3233);
}
var shop_default = export_helper_default(shop_vue_vue_type_script_lang_default, [["render", _sfc_render234], ["__file", "shop.vue"]]);
var shopping_bag_vue_vue_type_script_lang_default = {
  name: "ShoppingBag"
};
var _hoisted_1235 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2235 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 320v96a32 32 0 0 1-32 32h-32V320H384v128h-32a32 32 0 0 1-32-32v-96H192v576h640V320H704zm-384-64a192 192 0 1 1 384 0h160a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h160zm64 0h256a128 128 0 1 0-256 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3234 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 704h640v64H192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_472 = [
  _hoisted_2235,
  _hoisted_3234
];
function _sfc_render235(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1235, _hoisted_472);
}
var shopping_bag_default = export_helper_default(shopping_bag_vue_vue_type_script_lang_default, [["render", _sfc_render235], ["__file", "shopping-bag.vue"]]);
var shopping_cart_full_vue_vue_type_script_lang_default = {
  name: "ShoppingCartFull"
};
var _hoisted_1236 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2236 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zM96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128H96zm314.24 576h395.904l82.304-384H333.44l76.8 384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3235 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M699.648 256 608 145.984 516.352 256h183.296zm-140.8-151.04a64 64 0 0 1 98.304 0L836.352 320H379.648l179.2-215.04z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_473 = [
  _hoisted_2236,
  _hoisted_3235
];
function _sfc_render236(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1236, _hoisted_473);
}
var shopping_cart_full_default = export_helper_default(shopping_cart_full_vue_vue_type_script_lang_default, [["render", _sfc_render236], ["__file", "shopping-cart-full.vue"]]);
var shopping_cart_vue_vue_type_script_lang_default = {
  name: "ShoppingCart"
};
var _hoisted_1237 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2237 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zM96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128H96zm314.24 576h395.904l82.304-384H333.44l76.8 384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3236 = [
  _hoisted_2237
];
function _sfc_render237(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1237, _hoisted_3236);
}
var shopping_cart_default = export_helper_default(shopping_cart_vue_vue_type_script_lang_default, [["render", _sfc_render237], ["__file", "shopping-cart.vue"]]);
var shopping_trolley_vue_vue_type_script_lang_default = {
  name: "ShoppingTrolley"
};
var _hoisted_1238 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2238 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M368 833c-13.3 0-24.5 4.5-33.5 13.5S321 866.7 321 880s4.5 24.5 13.5 33.5 20.2 13.8 33.5 14.5c13.3-.7 24.5-5.5 33.5-14.5S415 893.3 415 880s-4.5-24.5-13.5-33.5S381.3 833 368 833zm439-193c7.4 0 13.8-2.2 19.5-6.5S836 623.3 838 616l112-448c2-10-.2-19.2-6.5-27.5S929 128 919 128H96c-9.3 0-17 3-23 9s-9 13.7-9 23 3 17 9 23 13.7 9 23 9h96v576h672c9.3 0 17-3 23-9s9-13.7 9-23-3-17-9-23-13.7-9-23-9H256v-64h551zM256 192h622l-96 384H256V192zm432 641c-13.3 0-24.5 4.5-33.5 13.5S641 866.7 641 880s4.5 24.5 13.5 33.5 20.2 13.8 33.5 14.5c13.3-.7 24.5-5.5 33.5-14.5S735 893.3 735 880s-4.5-24.5-13.5-33.5S701.3 833 688 833z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3237 = [
  _hoisted_2238
];
function _sfc_render238(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1238, _hoisted_3237);
}
var shopping_trolley_default = export_helper_default(shopping_trolley_vue_vue_type_script_lang_default, [["render", _sfc_render238], ["__file", "shopping-trolley.vue"]]);
var smoking_vue_vue_type_script_lang_default = {
  name: "Smoking"
};
var _hoisted_1239 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2239 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 576v128h640V576H256zm-32-64h704a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V544a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3238 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 576h64v128h-64zM256 64h64v320h-64zM128 192h64v192h-64zM64 512h64v256H64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_474 = [
  _hoisted_2239,
  _hoisted_3238
];
function _sfc_render239(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1239, _hoisted_474);
}
var smoking_default = export_helper_default(smoking_vue_vue_type_script_lang_default, [["render", _sfc_render239], ["__file", "smoking.vue"]]);
var soccer_vue_vue_type_script_lang_default = {
  name: "Soccer"
};
var _hoisted_1240 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2240 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M418.496 871.04 152.256 604.8c-16.512 94.016-2.368 178.624 42.944 224 44.928 44.928 129.344 58.752 223.296 42.24zm72.32-18.176a573.056 573.056 0 0 0 224.832-137.216 573.12 573.12 0 0 0 137.216-224.832L533.888 171.84a578.56 578.56 0 0 0-227.52 138.496A567.68 567.68 0 0 0 170.432 532.48l320.384 320.384zM871.04 418.496c16.512-93.952 2.688-178.368-42.24-223.296-44.544-44.544-128.704-58.048-222.592-41.536L871.04 418.496zM149.952 874.048c-112.96-112.96-88.832-408.96 111.168-608.96C461.056 65.152 760.96 36.928 874.048 149.952c113.024 113.024 86.784 411.008-113.152 610.944-199.936 199.936-497.92 226.112-610.944 113.152zm452.544-497.792 22.656-22.656a32 32 0 0 1 45.248 45.248l-22.656 22.656 45.248 45.248A32 32 0 1 1 647.744 512l-45.248-45.248L557.248 512l45.248 45.248a32 32 0 1 1-45.248 45.248L512 557.248l-45.248 45.248L512 647.744a32 32 0 1 1-45.248 45.248l-45.248-45.248-22.656 22.656a32 32 0 1 1-45.248-45.248l22.656-22.656-45.248-45.248A32 32 0 1 1 376.256 512l45.248 45.248L466.752 512l-45.248-45.248a32 32 0 1 1 45.248-45.248L512 466.752l45.248-45.248L512 376.256a32 32 0 0 1 45.248-45.248l45.248 45.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3239 = [
  _hoisted_2240
];
function _sfc_render240(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1240, _hoisted_3239);
}
var soccer_default = export_helper_default(soccer_vue_vue_type_script_lang_default, [["render", _sfc_render240], ["__file", "soccer.vue"]]);
var sold_out_vue_vue_type_script_lang_default = {
  name: "SoldOut"
};
var _hoisted_1241 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2241 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 476.16a32 32 0 1 1 45.248 45.184l-128 128a32 32 0 0 1-45.248 0l-128-128a32 32 0 1 1 45.248-45.248L704 837.504V608a32 32 0 1 1 64 0v229.504l73.408-73.408z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3240 = [
  _hoisted_2241
];
function _sfc_render241(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1241, _hoisted_3240);
}
var sold_out_default = export_helper_default(sold_out_vue_vue_type_script_lang_default, [["render", _sfc_render241], ["__file", "sold-out.vue"]]);
var sort_down_vue_vue_type_script_lang_default = {
  name: "SortDown"
};
var _hoisted_1242 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2242 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M576 96v709.568L333.312 562.816A32 32 0 1 0 288 608l297.408 297.344A32 32 0 0 0 640 882.688V96a32 32 0 0 0-64 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3241 = [
  _hoisted_2242
];
function _sfc_render242(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1242, _hoisted_3241);
}
var sort_down_default = export_helper_default(sort_down_vue_vue_type_script_lang_default, [["render", _sfc_render242], ["__file", "sort-down.vue"]]);
var sort_up_vue_vue_type_script_lang_default = {
  name: "SortUp"
};
var _hoisted_1243 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2243 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 141.248V928a32 32 0 1 0 64 0V218.56l242.688 242.688A32 32 0 1 0 736 416L438.592 118.656A32 32 0 0 0 384 141.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3242 = [
  _hoisted_2243
];
function _sfc_render243(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1243, _hoisted_3242);
}
var sort_up_default = export_helper_default(sort_up_vue_vue_type_script_lang_default, [["render", _sfc_render243], ["__file", "sort-up.vue"]]);
var sort_vue_vue_type_script_lang_default = {
  name: "Sort"
};
var _hoisted_1244 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2244 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632V96zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0V141.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3243 = [
  _hoisted_2244
];
function _sfc_render244(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1244, _hoisted_3243);
}
var sort_default = export_helper_default(sort_vue_vue_type_script_lang_default, [["render", _sfc_render244], ["__file", "sort.vue"]]);
var stamp_vue_vue_type_script_lang_default = {
  name: "Stamp"
};
var _hoisted_1245 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2245 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M624 475.968V640h144a128 128 0 0 1 128 128H128a128 128 0 0 1 128-128h144V475.968a192 192 0 1 1 224 0zM128 896v-64h768v64H128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3244 = [
  _hoisted_2245
];
function _sfc_render245(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1245, _hoisted_3244);
}
var stamp_default = export_helper_default(stamp_vue_vue_type_script_lang_default, [["render", _sfc_render245], ["__file", "stamp.vue"]]);
var star_filled_vue_vue_type_script_lang_default = {
  name: "StarFilled"
};
var _hoisted_1246 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2246 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3245 = [
  _hoisted_2246
];
function _sfc_render246(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1246, _hoisted_3245);
}
var star_filled_default = export_helper_default(star_filled_vue_vue_type_script_lang_default, [["render", _sfc_render246], ["__file", "star-filled.vue"]]);
var star_vue_vue_type_script_lang_default = {
  name: "Star"
};
var _hoisted_1247 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2247 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3246 = [
  _hoisted_2247
];
function _sfc_render247(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1247, _hoisted_3246);
}
var star_default = export_helper_default(star_vue_vue_type_script_lang_default, [["render", _sfc_render247], ["__file", "star.vue"]]);
var stopwatch_vue_vue_type_script_lang_default = {
  name: "Stopwatch"
};
var _hoisted_1248 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2248 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3247 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M672 234.88c-39.168 174.464-80 298.624-122.688 372.48-64 110.848-202.624 30.848-138.624-80C453.376 453.44 540.48 355.968 672 234.816z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_475 = [
  _hoisted_2248,
  _hoisted_3247
];
function _sfc_render248(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1248, _hoisted_475);
}
var stopwatch_default = export_helper_default(stopwatch_vue_vue_type_script_lang_default, [["render", _sfc_render248], ["__file", "stopwatch.vue"]]);
var success_filled_vue_vue_type_script_lang_default = {
  name: "SuccessFilled"
};
var _hoisted_1249 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2249 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3248 = [
  _hoisted_2249
];
function _sfc_render249(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1249, _hoisted_3248);
}
var success_filled_default = export_helper_default(success_filled_vue_vue_type_script_lang_default, [["render", _sfc_render249], ["__file", "success-filled.vue"]]);
var sugar_vue_vue_type_script_lang_default = {
  name: "Sugar"
};
var _hoisted_1250 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2250 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m801.728 349.184 4.48 4.48a128 128 0 0 1 0 180.992L534.656 806.144a128 128 0 0 1-181.056 0l-4.48-4.48-19.392 109.696a64 64 0 0 1-108.288 34.176L78.464 802.56a64 64 0 0 1 34.176-108.288l109.76-19.328-4.544-4.544a128 128 0 0 1 0-181.056l271.488-271.488a128 128 0 0 1 181.056 0l4.48 4.48 19.392-109.504a64 64 0 0 1 108.352-34.048l142.592 143.04a64 64 0 0 1-34.24 108.16l-109.248 19.2zm-548.8 198.72h447.168v2.24l60.8-60.8a63.808 63.808 0 0 0 18.752-44.416h-426.88l-89.664 89.728a64.064 64.064 0 0 0-10.24 13.248zm0 64c2.752 4.736 6.144 9.152 10.176 13.248l135.744 135.744a64 64 0 0 0 90.496 0L638.4 611.904H252.928zm490.048-230.976L625.152 263.104a64 64 0 0 0-90.496 0L416.768 380.928h326.208zM123.712 757.312l142.976 142.976 24.32-137.6a25.6 25.6 0 0 0-29.696-29.632l-137.6 24.256zm633.6-633.344-24.32 137.472a25.6 25.6 0 0 0 29.632 29.632l137.28-24.064-142.656-143.04z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3249 = [
  _hoisted_2250
];
function _sfc_render250(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1250, _hoisted_3249);
}
var sugar_default = export_helper_default(sugar_vue_vue_type_script_lang_default, [["render", _sfc_render250], ["__file", "sugar.vue"]]);
var suitcase_line_vue_vue_type_script_lang_default = {
  name: "SuitcaseLine"
};
var _hoisted_1251 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2251 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M922.5 229.5c-24.32-24.34-54.49-36.84-90.5-37.5H704v-64c-.68-17.98-7.02-32.98-19.01-44.99S658.01 64.66 640 64H384c-17.98.68-32.98 7.02-44.99 19.01S320.66 110 320 128v64H192c-35.99.68-66.16 13.18-90.5 37.5C77.16 253.82 64.66 283.99 64 320v448c.68 35.99 13.18 66.16 37.5 90.5s54.49 36.84 90.5 37.5h640c35.99-.68 66.16-13.18 90.5-37.5s36.84-54.49 37.5-90.5V320c-.68-35.99-13.18-66.16-37.5-90.5zM384 128h256v64H384v-64zM256 832h-64c-17.98-.68-32.98-7.02-44.99-19.01S128.66 786.01 128 768V448h128v384zm448 0H320V448h384v384zm192-64c-.68 17.98-7.02 32.98-19.01 44.99S850.01 831.34 832 832h-64V448h128v320zm0-384H128v-64c.69-17.98 7.02-32.98 19.01-44.99S173.99 256.66 192 256h640c17.98.69 32.98 7.02 44.99 19.01S895.34 301.99 896 320v64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3250 = [
  _hoisted_2251
];
function _sfc_render251(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1251, _hoisted_3250);
}
var suitcase_line_default = export_helper_default(suitcase_line_vue_vue_type_script_lang_default, [["render", _sfc_render251], ["__file", "suitcase-line.vue"]]);
var suitcase_vue_vue_type_script_lang_default = {
  name: "Suitcase"
};
var _hoisted_1252 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2252 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 384h768v-64a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v64zm0 64v320a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V448H128zm64-256h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3251 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M384 128v64h256v-64H384zm0-64h256a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_476 = [
  _hoisted_2252,
  _hoisted_3251
];
function _sfc_render252(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1252, _hoisted_476);
}
var suitcase_default = export_helper_default(suitcase_vue_vue_type_script_lang_default, [["render", _sfc_render252], ["__file", "suitcase.vue"]]);
var sunny_vue_vue_type_script_lang_default = {
  name: "Sunny"
};
var _hoisted_1253 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2253 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3252 = [
  _hoisted_2253
];
function _sfc_render253(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1253, _hoisted_3252);
}
var sunny_default = export_helper_default(sunny_vue_vue_type_script_lang_default, [["render", _sfc_render253], ["__file", "sunny.vue"]]);
var sunrise_vue_vue_type_script_lang_default = {
  name: "Sunrise"
};
var _hoisted_1254 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2254 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M32 768h960a32 32 0 1 1 0 64H32a32 32 0 1 1 0-64zm129.408-96a352 352 0 0 1 701.184 0h-64.32a288 288 0 0 0-572.544 0h-64.32zM512 128a32 32 0 0 1 32 32v96a32 32 0 0 1-64 0v-96a32 32 0 0 1 32-32zm407.296 168.704a32 32 0 0 1 0 45.248l-67.84 67.84a32 32 0 1 1-45.248-45.248l67.84-67.84a32 32 0 0 1 45.248 0zm-814.592 0a32 32 0 0 1 45.248 0l67.84 67.84a32 32 0 1 1-45.248 45.248l-67.84-67.84a32 32 0 0 1 0-45.248z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3253 = [
  _hoisted_2254
];
function _sfc_render254(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1254, _hoisted_3253);
}
var sunrise_default = export_helper_default(sunrise_vue_vue_type_script_lang_default, [["render", _sfc_render254], ["__file", "sunrise.vue"]]);
var sunset_vue_vue_type_script_lang_default = {
  name: "Sunset"
};
var _hoisted_1255 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2255 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M82.56 640a448 448 0 1 1 858.88 0h-67.2a384 384 0 1 0-724.288 0H82.56zM32 704h960q32 0 32 32t-32 32H32q-32 0-32-32t32-32zm256 128h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3254 = [
  _hoisted_2255
];
function _sfc_render255(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1255, _hoisted_3254);
}
var sunset_default = export_helper_default(sunset_vue_vue_type_script_lang_default, [["render", _sfc_render255], ["__file", "sunset.vue"]]);
var switch_button_vue_vue_type_script_lang_default = {
  name: "SwitchButton"
};
var _hoisted_1256 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2256 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3255 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_477 = [
  _hoisted_2256,
  _hoisted_3255
];
function _sfc_render256(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1256, _hoisted_477);
}
var switch_button_default = export_helper_default(switch_button_vue_vue_type_script_lang_default, [["render", _sfc_render256], ["__file", "switch-button.vue"]]);
var switch_filled_vue_vue_type_script_lang_default = {
  name: "SwitchFilled"
};
var _hoisted_1257 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2257 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M247.47 358.4v.04c.07 19.17 7.72 37.53 21.27 51.09s31.92 21.2 51.09 21.27c39.86 0 72.41-32.6 72.41-72.4s-32.6-72.36-72.41-72.36-72.36 32.55-72.36 72.36z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3256 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M492.38 128H324.7c-52.16 0-102.19 20.73-139.08 57.61a196.655 196.655 0 0 0-57.61 139.08V698.7c-.01 25.84 5.08 51.42 14.96 75.29s24.36 45.56 42.63 63.83 39.95 32.76 63.82 42.65a196.67 196.67 0 0 0 75.28 14.98h167.68c3.03 0 5.46-2.43 5.46-5.42V133.42c.6-2.99-1.83-5.42-5.46-5.42zm-56.11 705.88H324.7c-17.76.13-35.36-3.33-51.75-10.18s-31.22-16.94-43.61-29.67c-25.3-25.35-39.81-59.1-39.81-95.32V324.69c-.13-17.75 3.33-35.35 10.17-51.74a131.695 131.695 0 0 1 29.64-43.62c25.39-25.3 59.14-39.81 95.36-39.81h111.57v644.36zm402.12-647.67a196.655 196.655 0 0 0-139.08-57.61H580.48c-3.03 0-4.82 2.43-4.82 4.82v757.16c-.6 2.99 1.79 5.42 5.42 5.42h118.23a196.69 196.69 0 0 0 139.08-57.61A196.655 196.655 0 0 0 896 699.31V325.29a196.69 196.69 0 0 0-57.61-139.08zm-111.3 441.92c-42.83 0-77.82-34.99-77.82-77.82s34.98-77.82 77.82-77.82c42.83 0 77.82 34.99 77.82 77.82s-34.99 77.82-77.82 77.82z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_478 = [
  _hoisted_2257,
  _hoisted_3256
];
function _sfc_render257(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1257, _hoisted_478);
}
var switch_filled_default = export_helper_default(switch_filled_vue_vue_type_script_lang_default, [["render", _sfc_render257], ["__file", "switch-filled.vue"]]);
var switch_vue_vue_type_script_lang_default = {
  name: "Switch"
};
var _hoisted_1258 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2258 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M118.656 438.656a32 32 0 0 1 0-45.248L416 96l4.48-3.776A32 32 0 0 1 461.248 96l3.712 4.48a32.064 32.064 0 0 1-3.712 40.832L218.56 384H928a32 32 0 1 1 0 64H141.248a32 32 0 0 1-22.592-9.344zM64 608a32 32 0 0 1 32-32h786.752a32 32 0 0 1 22.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 0 1-40.832-49.024L805.632 640H96a32 32 0 0 1-32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3257 = [
  _hoisted_2258
];
function _sfc_render258(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1258, _hoisted_3257);
}
var switch_default = export_helper_default(switch_vue_vue_type_script_lang_default, [["render", _sfc_render258], ["__file", "switch.vue"]]);
var takeaway_box_vue_vue_type_script_lang_default = {
  name: "TakeawayBox"
};
var _hoisted_1259 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2259 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M832 384H192v448h640V384zM96 320h832V128H96v192zm800 64v480a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V384H64a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h896a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32h-64zM416 512h192a32 32 0 0 1 0 64H416a32 32 0 0 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3258 = [
  _hoisted_2259
];
function _sfc_render259(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1259, _hoisted_3258);
}
var takeaway_box_default = export_helper_default(takeaway_box_vue_vue_type_script_lang_default, [["render", _sfc_render259], ["__file", "takeaway-box.vue"]]);
var ticket_vue_vue_type_script_lang_default = {
  name: "Ticket"
};
var _hoisted_1260 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2260 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 832H64V640a128 128 0 1 0 0-256V192h576v160h64V192h256v192a128 128 0 1 0 0 256v192H704V672h-64v160zm0-416v192h64V416h-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3259 = [
  _hoisted_2260
];
function _sfc_render260(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1260, _hoisted_3259);
}
var ticket_default = export_helper_default(ticket_vue_vue_type_script_lang_default, [["render", _sfc_render260], ["__file", "ticket.vue"]]);
var tickets_vue_vue_type_script_lang_default = {
  name: "Tickets"
};
var _hoisted_1261 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2261 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3260 = [
  _hoisted_2261
];
function _sfc_render261(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1261, _hoisted_3260);
}
var tickets_default = export_helper_default(tickets_vue_vue_type_script_lang_default, [["render", _sfc_render261], ["__file", "tickets.vue"]]);
var timer_vue_vue_type_script_lang_default = {
  name: "Timer"
};
var _hoisted_1262 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2262 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 896a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3261 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 320a32 32 0 0 1 32 32l-.512 224a32 32 0 1 1-64 0L480 352a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_479 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M448 576a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm96-448v128h-64V128h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64h-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_522 = [
  _hoisted_2262,
  _hoisted_3261,
  _hoisted_479
];
function _sfc_render262(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1262, _hoisted_522);
}
var timer_default = export_helper_default(timer_vue_vue_type_script_lang_default, [["render", _sfc_render262], ["__file", "timer.vue"]]);
var toilet_paper_vue_vue_type_script_lang_default = {
  name: "ToiletPaper"
};
var _hoisted_1263 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2263 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M595.2 128H320a192 192 0 0 0-192 192v576h384V352c0-90.496 32.448-171.2 83.2-224zM736 64c123.712 0 224 128.96 224 288S859.712 640 736 640H576v320H64V320A256 256 0 0 1 320 64h416zM576 352v224h160c84.352 0 160-97.28 160-224s-75.648-224-160-224-160 97.28-160 224z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3262 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M736 448c-35.328 0-64-43.008-64-96s28.672-96 64-96 64 43.008 64 96-28.672 96-64 96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_480 = [
  _hoisted_2263,
  _hoisted_3262
];
function _sfc_render263(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1263, _hoisted_480);
}
var toilet_paper_default = export_helper_default(toilet_paper_vue_vue_type_script_lang_default, [["render", _sfc_render263], ["__file", "toilet-paper.vue"]]);
var tools_vue_vue_type_script_lang_default = {
  name: "Tools"
};
var _hoisted_1264 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2264 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3263 = [
  _hoisted_2264
];
function _sfc_render264(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1264, _hoisted_3263);
}
var tools_default = export_helper_default(tools_vue_vue_type_script_lang_default, [["render", _sfc_render264], ["__file", "tools.vue"]]);
var top_left_vue_vue_type_script_lang_default = {
  name: "TopLeft"
};
var _hoisted_1265 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2265 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M256 256h416a32 32 0 1 0 0-64H224a32 32 0 0 0-32 32v448a32 32 0 0 0 64 0V256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3264 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M246.656 201.344a32 32 0 0 0-45.312 45.312l544 544a32 32 0 0 0 45.312-45.312l-544-544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_481 = [
  _hoisted_2265,
  _hoisted_3264
];
function _sfc_render265(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1265, _hoisted_481);
}
var top_left_default = export_helper_default(top_left_vue_vue_type_script_lang_default, [["render", _sfc_render265], ["__file", "top-left.vue"]]);
var top_right_vue_vue_type_script_lang_default = {
  name: "TopRight"
};
var _hoisted_1266 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2266 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0V256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3265 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312l544-544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_482 = [
  _hoisted_2266,
  _hoisted_3265
];
function _sfc_render266(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1266, _hoisted_482);
}
var top_right_default = export_helper_default(top_right_vue_vue_type_script_lang_default, [["render", _sfc_render266], ["__file", "top-right.vue"]]);
var top_vue_vue_type_script_lang_default = {
  name: "Top"
};
var _hoisted_1267 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2267 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3266 = [
  _hoisted_2267
];
function _sfc_render267(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1267, _hoisted_3266);
}
var top_default = export_helper_default(top_vue_vue_type_script_lang_default, [["render", _sfc_render267], ["__file", "top.vue"]]);
var trend_charts_vue_vue_type_script_lang_default = {
  name: "TrendCharts"
};
var _hoisted_1268 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2268 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 896V128h768v768H128zm291.712-327.296 128 102.4 180.16-201.792-47.744-42.624-139.84 156.608-128-102.4-180.16 201.792 47.744 42.624 139.84-156.608zM816 352a48 48 0 1 0-96 0 48 48 0 0 0 96 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3267 = [
  _hoisted_2268
];
function _sfc_render268(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1268, _hoisted_3267);
}
var trend_charts_default = export_helper_default(trend_charts_vue_vue_type_script_lang_default, [["render", _sfc_render268], ["__file", "trend-charts.vue"]]);
var trophy_base_vue_vue_type_script_lang_default = {
  name: "TrophyBase"
};
var _hoisted_1269 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2269 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M918.4 201.6c-6.4-6.4-12.8-9.6-22.4-9.6H768V96c0-9.6-3.2-16-9.6-22.4C752 67.2 745.6 64 736 64H288c-9.6 0-16 3.2-22.4 9.6C259.2 80 256 86.4 256 96v96H128c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 16-9.6 22.4 3.2 108.8 25.6 185.6 64 224 34.4 34.4 77.56 55.65 127.65 61.99 10.91 20.44 24.78 39.25 41.95 56.41 40.86 40.86 91 65.47 150.4 71.9V768h-96c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h256c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6h-96V637.26c59.4-7.71 109.54-30.01 150.4-70.86 17.2-17.2 31.51-36.06 42.81-56.55 48.93-6.51 90.02-27.7 126.79-61.85 38.4-38.4 60.8-112 64-224 0-6.4-3.2-16-9.6-22.4zM256 438.4c-19.2-6.4-35.2-19.2-51.2-35.2-22.4-22.4-35.2-70.4-41.6-147.2H256v182.4zm390.4 80C608 553.6 566.4 576 512 576s-99.2-19.2-134.4-57.6C342.4 480 320 438.4 320 384V128h384v256c0 54.4-19.2 99.2-57.6 134.4zm172.8-115.2c-16 16-32 25.6-51.2 35.2V256h92.8c-6.4 76.8-19.2 124.8-41.6 147.2zM768 896H256c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h512c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3268 = [
  _hoisted_2269
];
function _sfc_render269(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1269, _hoisted_3268);
}
var trophy_base_default = export_helper_default(trophy_base_vue_vue_type_script_lang_default, [["render", _sfc_render269], ["__file", "trophy-base.vue"]]);
var trophy_vue_vue_type_script_lang_default = {
  name: "Trophy"
};
var _hoisted_1270 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2270 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64h128zm224-448V128H320v320a192 192 0 1 0 384 0zm64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768v192zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448H256z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3269 = [
  _hoisted_2270
];
function _sfc_render270(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1270, _hoisted_3269);
}
var trophy_default = export_helper_default(trophy_vue_vue_type_script_lang_default, [["render", _sfc_render270], ["__file", "trophy.vue"]]);
var turn_off_vue_vue_type_script_lang_default = {
  name: "TurnOff"
};
var _hoisted_1271 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2271 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724H329.956zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3270 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M329.956 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454zm0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_483 = [
  _hoisted_2271,
  _hoisted_3270
];
function _sfc_render271(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1271, _hoisted_483);
}
var turn_off_default = export_helper_default(turn_off_vue_vue_type_script_lang_default, [["render", _sfc_render271], ["__file", "turn-off.vue"]]);
var umbrella_vue_vue_type_script_lang_default = {
  name: "Umbrella"
};
var _hoisted_1272 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2272 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M320 768a32 32 0 1 1 64 0 64 64 0 0 0 128 0V512H64a448 448 0 1 1 896 0H576v256a128 128 0 1 1-256 0zm570.688-320a384.128 384.128 0 0 0-757.376 0h757.376z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3271 = [
  _hoisted_2272
];
function _sfc_render272(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1272, _hoisted_3271);
}
var umbrella_default = export_helper_default(umbrella_vue_vue_type_script_lang_default, [["render", _sfc_render272], ["__file", "umbrella.vue"]]);
var unlock_vue_vue_type_script_lang_default = {
  name: "Unlock"
};
var _hoisted_1273 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2273 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3272 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm178.304-295.296A192.064 192.064 0 0 0 320 320v64h352l96 38.4V448H256V320a256 256 0 0 1 493.76-95.104l-59.456 23.808z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_484 = [
  _hoisted_2273,
  _hoisted_3272
];
function _sfc_render273(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1273, _hoisted_484);
}
var unlock_default = export_helper_default(unlock_vue_vue_type_script_lang_default, [["render", _sfc_render273], ["__file", "unlock.vue"]]);
var upload_filled_vue_vue_type_script_lang_default = {
  name: "UploadFilled"
};
var _hoisted_1274 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2274 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3273 = [
  _hoisted_2274
];
function _sfc_render274(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1274, _hoisted_3273);
}
var upload_filled_default = export_helper_default(upload_filled_vue_vue_type_script_lang_default, [["render", _sfc_render274], ["__file", "upload-filled.vue"]]);
var upload_vue_vue_type_script_lang_default = {
  name: "Upload"
};
var _hoisted_1275 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2275 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3274 = [
  _hoisted_2275
];
function _sfc_render275(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1275, _hoisted_3274);
}
var upload_default = export_helper_default(upload_vue_vue_type_script_lang_default, [["render", _sfc_render275], ["__file", "upload.vue"]]);
var user_filled_vue_vue_type_script_lang_default = {
  name: "UserFilled"
};
var _hoisted_1276 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2276 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3275 = [
  _hoisted_2276
];
function _sfc_render276(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1276, _hoisted_3275);
}
var user_filled_default = export_helper_default(user_filled_vue_vue_type_script_lang_default, [["render", _sfc_render276], ["__file", "user-filled.vue"]]);
var user_vue_vue_type_script_lang_default = {
  name: "User"
};
var _hoisted_1277 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2277 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3276 = [
  _hoisted_2277
];
function _sfc_render277(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1277, _hoisted_3276);
}
var user_default = export_helper_default(user_vue_vue_type_script_lang_default, [["render", _sfc_render277], ["__file", "user.vue"]]);
var van_vue_vue_type_script_lang_default = {
  name: "Van"
};
var _hoisted_1278 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2278 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128.896 736H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v96h164.544a32 32 0 0 1 31.616 27.136l54.144 352A32 32 0 0 1 922.688 736h-91.52a144 144 0 1 1-286.272 0H415.104a144 144 0 1 1-286.272 0zm23.36-64a143.872 143.872 0 0 1 239.488 0H568.32c17.088-25.6 42.24-45.376 71.744-55.808V256H128v416h24.256zm655.488 0h77.632l-19.648-128H704v64.896A144 144 0 0 1 807.744 672zm48.128-192-14.72-96H704v96h151.872zM688 832a80 80 0 1 0 0-160 80 80 0 0 0 0 160zm-416 0a80 80 0 1 0 0-160 80 80 0 0 0 0 160z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3277 = [
  _hoisted_2278
];
function _sfc_render278(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1278, _hoisted_3277);
}
var van_default = export_helper_default(van_vue_vue_type_script_lang_default, [["render", _sfc_render278], ["__file", "van.vue"]]);
var video_camera_filled_vue_vue_type_script_lang_default = {
  name: "VideoCameraFilled"
};
var _hoisted_1279 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2279 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m768 576 192-64v320l-192-64v96a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 0 1 320 0 160 160 0 0 1-320 0zm64 0a96 96 0 1 0 192.064-.064A96 96 0 0 0 448 288zm-320 32a128 128 0 1 1 256.064.064A128 128 0 0 1 128 320zm64 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3278 = [
  _hoisted_2279
];
function _sfc_render279(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1279, _hoisted_3278);
}
var video_camera_filled_default = export_helper_default(video_camera_filled_vue_vue_type_script_lang_default, [["render", _sfc_render279], ["__file", "video-camera-filled.vue"]]);
var video_camera_vue_vue_type_script_lang_default = {
  name: "VideoCamera"
};
var _hoisted_1280 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2280 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3279 = [
  _hoisted_2280
];
function _sfc_render280(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1280, _hoisted_3279);
}
var video_camera_default = export_helper_default(video_camera_vue_vue_type_script_lang_default, [["render", _sfc_render280], ["__file", "video-camera.vue"]]);
var video_pause_vue_vue_type_script_lang_default = {
  name: "VideoPause"
};
var _hoisted_1281 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2281 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3280 = [
  _hoisted_2281
];
function _sfc_render281(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1281, _hoisted_3280);
}
var video_pause_default = export_helper_default(video_pause_vue_vue_type_script_lang_default, [["render", _sfc_render281], ["__file", "video-pause.vue"]]);
var video_play_vue_vue_type_script_lang_default = {
  name: "VideoPlay"
};
var _hoisted_1282 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2282 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3281 = [
  _hoisted_2282
];
function _sfc_render282(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1282, _hoisted_3281);
}
var video_play_default = export_helper_default(video_play_vue_vue_type_script_lang_default, [["render", _sfc_render282], ["__file", "video-play.vue"]]);
var view_vue_vue_type_script_lang_default = {
  name: "View"
};
var _hoisted_1283 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2283 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3282 = [
  _hoisted_2283
];
function _sfc_render283(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1283, _hoisted_3282);
}
var view_default = export_helper_default(view_vue_vue_type_script_lang_default, [["render", _sfc_render283], ["__file", "view.vue"]]);
var wallet_filled_vue_vue_type_script_lang_default = {
  name: "WalletFilled"
};
var _hoisted_1284 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2284 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M688 512a112 112 0 1 0 0 224h208v160H128V352h768v160H688zm32 160h-32a48 48 0 0 1 0-96h32a48 48 0 0 1 0 96zm-80-544 128 160H384l256-160z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3283 = [
  _hoisted_2284
];
function _sfc_render284(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1284, _hoisted_3283);
}
var wallet_filled_default = export_helper_default(wallet_filled_vue_vue_type_script_lang_default, [["render", _sfc_render284], ["__file", "wallet-filled.vue"]]);
var wallet_vue_vue_type_script_lang_default = {
  name: "Wallet"
};
var _hoisted_1285 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2285 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M640 288h-64V128H128v704h384v32a32 32 0 0 0 32 32H96a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v192z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3284 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M128 320v512h768V320H128zm-32-64h832a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_485 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M704 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_523 = [
  _hoisted_2285,
  _hoisted_3284,
  _hoisted_485
];
function _sfc_render285(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1285, _hoisted_523);
}
var wallet_default = export_helper_default(wallet_vue_vue_type_script_lang_default, [["render", _sfc_render285], ["__file", "wallet.vue"]]);
var warn_triangle_filled_vue_vue_type_script_lang_default = {
  name: "WarnTriangleFilled"
};
var _hoisted_1286 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  style: { "enable-background": "new 0 0 1024 1024" },
  viewBox: "0 0 1024 1024"
};
var _hoisted_2286 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M928.99 755.83 574.6 203.25c-12.89-20.16-36.76-32.58-62.6-32.58s-49.71 12.43-62.6 32.58L95.01 755.83c-12.91 20.12-12.9 44.91.01 65.03 12.92 20.12 36.78 32.51 62.59 32.49h708.78c25.82.01 49.68-12.37 62.59-32.49 12.91-20.12 12.92-44.91.01-65.03zM554.67 768h-85.33v-85.33h85.33V768zm0-426.67v298.66h-85.33V341.32l85.33.01z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3285 = [
  _hoisted_2286
];
function _sfc_render286(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1286, _hoisted_3285);
}
var warn_triangle_filled_default = export_helper_default(warn_triangle_filled_vue_vue_type_script_lang_default, [["render", _sfc_render286], ["__file", "warn-triangle-filled.vue"]]);
var warning_filled_vue_vue_type_script_lang_default = {
  name: "WarningFilled"
};
var _hoisted_1287 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2287 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3286 = [
  _hoisted_2287
];
function _sfc_render287(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1287, _hoisted_3286);
}
var warning_filled_default = export_helper_default(warning_filled_vue_vue_type_script_lang_default, [["render", _sfc_render287], ["__file", "warning-filled.vue"]]);
var warning_vue_vue_type_script_lang_default = {
  name: "Warning"
};
var _hoisted_1288 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2288 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3287 = [
  _hoisted_2288
];
function _sfc_render288(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1288, _hoisted_3287);
}
var warning_default = export_helper_default(warning_vue_vue_type_script_lang_default, [["render", _sfc_render288], ["__file", "warning.vue"]]);
var watch_vue_vue_type_script_lang_default = {
  name: "Watch"
};
var _hoisted_1289 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2289 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 768a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3288 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 352a32 32 0 0 1 32 32v160a32 32 0 0 1-64 0V384a32 32 0 0 1 32-32z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_486 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 512h128q32 0 32 32t-32 32H480q-32 0-32-32t32-32zm128-256V128H416v128h-64V64h320v192h-64zM416 768v128h192V768h64v192H352V768h64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_524 = [
  _hoisted_2289,
  _hoisted_3288,
  _hoisted_486
];
function _sfc_render289(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1289, _hoisted_524);
}
var watch_default = export_helper_default(watch_vue_vue_type_script_lang_default, [["render", _sfc_render289], ["__file", "watch.vue"]]);
var watermelon_vue_vue_type_script_lang_default = {
  name: "Watermelon"
};
var _hoisted_1290 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2290 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m683.072 600.32-43.648 162.816-61.824-16.512 53.248-198.528L576 493.248l-158.4 158.4-45.248-45.248 158.4-158.4-55.616-55.616-198.528 53.248-16.512-61.824 162.816-43.648L282.752 200A384 384 0 0 0 824 741.248L683.072 600.32zm231.552 141.056a448 448 0 1 1-632-632l632 632z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3289 = [
  _hoisted_2290
];
function _sfc_render290(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1290, _hoisted_3289);
}
var watermelon_default = export_helper_default(watermelon_vue_vue_type_script_lang_default, [["render", _sfc_render290], ["__file", "watermelon.vue"]]);
var wind_power_vue_vue_type_script_lang_default = {
  name: "WindPower"
};
var _hoisted_1291 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2291 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "M160 64q32 0 32 32v832q0 32-32 32t-32-32V96q0-32 32-32zm416 354.624 128-11.584V168.96l-128-11.52v261.12zm-64 5.824V151.552L320 134.08V160h-64V64l616.704 56.064A96 96 0 0 1 960 215.68v144.64a96 96 0 0 1-87.296 95.616L256 512V224h64v217.92l192-17.472zm256-23.232 98.88-8.96A32 32 0 0 0 896 360.32V215.68a32 32 0 0 0-29.12-31.872l-98.88-8.96v226.368z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3290 = [
  _hoisted_2291
];
function _sfc_render291(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1291, _hoisted_3290);
}
var wind_power_default = export_helper_default(wind_power_vue_vue_type_script_lang_default, [["render", _sfc_render291], ["__file", "wind-power.vue"]]);
var zoom_in_vue_vue_type_script_lang_default = {
  name: "ZoomIn"
};
var _hoisted_1292 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2292 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3291 = [
  _hoisted_2292
];
function _sfc_render292(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1292, _hoisted_3291);
}
var zoom_in_default = export_helper_default(zoom_in_vue_vue_type_script_lang_default, [["render", _sfc_render292], ["__file", "zoom-in.vue"]]);
var zoom_out_vue_vue_type_script_lang_default = {
  name: "ZoomOut"
};
var _hoisted_1293 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var _hoisted_2293 = createBaseVNode(
  "path",
  {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
  },
  null,
  -1
  /* HOISTED */
);
var _hoisted_3292 = [
  _hoisted_2293
];
function _sfc_render293(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1293, _hoisted_3292);
}
var zoom_out_default = export_helper_default(zoom_out_vue_vue_type_script_lang_default, [["render", _sfc_render293], ["__file", "zoom-out.vue"]]);

export {
  __commonJS,
  __toESM,
  NOOP,
  hasOwn,
  isArray,
  isDate,
  isFunction,
  isString,
  isObject,
  isPromise,
  toRawType,
  camelize,
  hyphenate,
  capitalize,
  normalizeStyle,
  normalizeClass,
  normalizeProps,
  toDisplayString,
  effectScope,
  getCurrentScope,
  onScopeDispose,
  reactive,
  shallowReactive,
  readonly,
  toRaw,
  markRaw,
  isRef,
  ref,
  shallowRef,
  triggerRef,
  unref,
  toRefs,
  toRef,
  computed,
  warn2 as warn,
  nextTick,
  withCtx,
  watchEffect,
  watch,
  withDirectives,
  defineComponent,
  onDeactivated,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  resolveComponent,
  resolveDynamicComponent,
  resolveDirective,
  renderList,
  createSlots,
  renderSlot,
  toHandlers,
  useSlots,
  useAttrs,
  provide,
  inject,
  Teleport,
  Fragment,
  Text,
  Comment,
  openBlock,
  createElementBlock,
  createBlock,
  isVNode,
  createBaseVNode,
  createVNode,
  guardReactiveProps,
  cloneVNode,
  createTextVNode,
  createCommentVNode,
  mergeProps,
  getCurrentInstance,
  computed2,
  h,
  Transition,
  TransitionGroup,
  vModelText,
  vModelCheckbox,
  vModelRadio,
  withModifiers,
  withKeys,
  vShow,
  render,
  createApp,
  add_location_default,
  aim_default,
  alarm_clock_default,
  apple_default,
  arrow_down_bold_default,
  arrow_down_default,
  arrow_left_bold_default,
  arrow_left_default,
  arrow_right_bold_default,
  arrow_right_default,
  arrow_up_bold_default,
  arrow_up_default,
  avatar_default,
  back_default,
  baseball_default,
  basketball_default,
  bell_filled_default,
  bell_default,
  bicycle_default,
  bottom_left_default,
  bottom_right_default,
  bottom_default,
  bowl_default,
  box_default,
  briefcase_default,
  brush_filled_default,
  brush_default,
  burger_default,
  calendar_default,
  camera_filled_default,
  camera_default,
  caret_bottom_default,
  caret_left_default,
  caret_right_default,
  caret_top_default,
  cellphone_default,
  chat_dot_round_default,
  chat_dot_square_default,
  chat_line_round_default,
  chat_line_square_default,
  chat_round_default,
  chat_square_default,
  check_default,
  checked_default,
  cherry_default,
  chicken_default,
  chrome_filled_default,
  circle_check_filled_default,
  circle_check_default,
  circle_close_filled_default,
  circle_close_default,
  circle_plus_filled_default,
  circle_plus_default,
  clock_default,
  close_bold_default,
  close_default,
  cloudy_default,
  coffee_cup_default,
  coffee_default,
  coin_default,
  cold_drink_default,
  collection_tag_default,
  collection_default,
  comment_default,
  compass_default,
  connection_default,
  coordinate_default,
  copy_document_default,
  cpu_default,
  credit_card_default,
  crop_default,
  d_arrow_left_default,
  d_arrow_right_default,
  d_caret_default,
  data_analysis_default,
  data_board_default,
  data_line_default,
  delete_filled_default,
  delete_location_default,
  delete_default,
  dessert_default,
  discount_default,
  dish_dot_default,
  dish_default,
  document_add_default,
  document_checked_default,
  document_copy_default,
  document_delete_default,
  document_remove_default,
  document_default,
  download_default,
  drizzling_default,
  edit_pen_default,
  edit_default,
  eleme_filled_default,
  eleme_default,
  element_plus_default,
  expand_default,
  failed_default,
  female_default,
  files_default,
  film_default,
  filter_default,
  finished_default,
  first_aid_kit_default,
  flag_default,
  fold_default,
  folder_add_default,
  folder_checked_default,
  folder_delete_default,
  folder_opened_default,
  folder_remove_default,
  folder_default,
  food_default,
  football_default,
  fork_spoon_default,
  fries_default,
  full_screen_default,
  goblet_full_default,
  goblet_square_full_default,
  goblet_square_default,
  goblet_default,
  gold_medal_default,
  goods_filled_default,
  goods_default,
  grape_default,
  grid_default,
  guide_default,
  handbag_default,
  headset_default,
  help_filled_default,
  help_default,
  hide_default,
  histogram_default,
  home_filled_default,
  hot_water_default,
  house_default,
  ice_cream_round_default,
  ice_cream_square_default,
  ice_cream_default,
  ice_drink_default,
  ice_tea_default,
  info_filled_default,
  iphone_default,
  key_default,
  knife_fork_default,
  lightning_default,
  link_default,
  list_default,
  loading_default,
  location_filled_default,
  location_information_default,
  location_default,
  lock_default,
  lollipop_default,
  magic_stick_default,
  magnet_default,
  male_default,
  management_default,
  map_location_default,
  medal_default,
  memo_default,
  menu_default,
  message_box_default,
  message_default,
  mic_default,
  microphone_default,
  milk_tea_default,
  minus_default,
  money_default,
  monitor_default,
  moon_night_default,
  moon_default,
  more_filled_default,
  more_default,
  mostly_cloudy_default,
  mouse_default,
  mug_default,
  mute_notification_default,
  mute_default,
  no_smoking_default,
  notebook_default,
  notification_default,
  odometer_default,
  office_building_default,
  open_default,
  operation_default,
  opportunity_default,
  orange_default,
  paperclip_default,
  partly_cloudy_default,
  pear_default,
  phone_filled_default,
  phone_default,
  picture_filled_default,
  picture_rounded_default,
  picture_default,
  pie_chart_default,
  place_default,
  platform_default,
  plus_default,
  pointer_default,
  position_default,
  postcard_default,
  pouring_default,
  present_default,
  price_tag_default,
  printer_default,
  promotion_default,
  quartz_watch_default,
  question_filled_default,
  rank_default,
  reading_lamp_default,
  reading_default,
  refresh_left_default,
  refresh_right_default,
  refresh_default,
  refrigerator_default,
  remove_filled_default,
  remove_default,
  right_default,
  scale_to_original_default,
  school_default,
  scissor_default,
  search_default,
  select_default,
  sell_default,
  semi_select_default,
  service_default,
  set_up_default,
  setting_default,
  share_default,
  ship_default,
  shop_default,
  shopping_bag_default,
  shopping_cart_full_default,
  shopping_cart_default,
  shopping_trolley_default,
  smoking_default,
  soccer_default,
  sold_out_default,
  sort_down_default,
  sort_up_default,
  sort_default,
  stamp_default,
  star_filled_default,
  star_default,
  stopwatch_default,
  success_filled_default,
  sugar_default,
  suitcase_line_default,
  suitcase_default,
  sunny_default,
  sunrise_default,
  sunset_default,
  switch_button_default,
  switch_filled_default,
  switch_default,
  takeaway_box_default,
  ticket_default,
  tickets_default,
  timer_default,
  toilet_paper_default,
  tools_default,
  top_left_default,
  top_right_default,
  top_default,
  trend_charts_default,
  trophy_base_default,
  trophy_default,
  turn_off_default,
  umbrella_default,
  unlock_default,
  upload_filled_default,
  upload_default,
  user_filled_default,
  user_default,
  van_default,
  video_camera_filled_default,
  video_camera_default,
  video_pause_default,
  video_play_default,
  view_default,
  wallet_filled_default,
  wallet_default,
  warn_triangle_filled_default,
  warning_filled_default,
  warning_default,
  watch_default,
  watermelon_default,
  wind_power_default,
  zoom_in_default,
  zoom_out_default
};
/*! Bundled license information:

@element-plus/icons-vue/dist/index.js:
  (*! Element Plus Icons Vue v2.1.0 *)
*/
//# sourceMappingURL=chunk-YJXPTEH7.js.map
