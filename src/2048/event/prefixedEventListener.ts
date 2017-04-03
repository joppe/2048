const prefixes:string[] = ['webkit', 'moz', 'MS', 'o', ''];

/**
 * @interface EventHandlerInterface
 */
interface EventHandlerInterface {
    /**
     * @param {JQueryEventObject} eventObject
     * @param {any[]} args
     */
    (eventObject:JQueryEventObject, ...args:any[]):void;
}

/**
 * @interface PrefixedEventListenerInterface
 */
interface PrefixedEventListenerInterface {
    /**
     * @param {JQuery} $el
     * @param {string} eventName
     * @param {EventHandlerInterface} handler
     * @param {boolean} [once]
     */
    ($el:JQuery, eventName:string, handler:EventHandlerInterface, once?:boolean):void;
}

/**
 * @param {JQuery} $el
 * @param {string} eventName
 * @param {Function} handler
 * @param {boolean} [once=false]
 */
export const prefixedEventListener:PrefixedEventListenerInterface = ($el:JQuery, eventName:string, handler:EventHandlerInterface, once:boolean = false):void => {
    const postfix:string = eventName.toLowerCase();

    prefixes.forEach((prefix:string):void => {
        $el.on(`${prefix}${postfix}`, handler);
    });
};
