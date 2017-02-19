import * as jQuery from 'jquery';
import {prefixedEventListener} from './../../src/event/prefixedEventListener';

/**
 * @interface HandlerInterface
 */
interface HandlerInterface {
    /**
     * @param {JQuery} $el
     * @returns {Promise}
     */
    ($el:JQuery):Promise<void>;
}

/**
 * @interface PositionPropertyInterface
 */
interface PositionPropertyInterface {
    /**
     * @type {number}
     */
    left?:number;

    /**
     * @type {number}
     */
    top?:number;
}

/**
 * @returns {JQuery}
 */
const topLeftElement:Function = ():JQuery => {
    return jQuery('.js-position__top-left');
};

/**
 * @returns {JQuery}
 */
const bottomRightElement:Function = ():JQuery => {
    return jQuery('.js-position__bottom-right');
};

/**
 * @returns {JQueryCoordinates}
 */
const topLeft:Function = ():JQueryCoordinates => {
    return topLeftElement().position();
};

/**
 * @returns {JQueryCoordinates}
 */
const bottomRight:Function = ():JQueryCoordinates => {
    return bottomRightElement().position();
};

/**
 * @returns {number}
 */
const maxDistance:Function = ():number => {
    const tl:JQueryCoordinates = topLeft();
    const br:JQueryCoordinates = bottomRight();

    return Math.abs(tl.left - br.left);
};

/**
 * @param {JQuery} $position
 * @param {JQuery} $target
 * @returns {number}
 */
const horizontalDistance:Function = ($position:JQuery, $target:JQuery):number => {
    const p1:JQueryCoordinates = $position.position();
    const p2:JQueryCoordinates = $target.position();

    return Math.abs(p1.left - p2.left);
};

/**
 * @param {JQuery} $position
 * @param {JQuery} $target
 * @returns {number}
 */
const verticalDistance:Function = ($position:JQuery, $target:JQuery):number => {
    const p1:JQueryCoordinates = $position.position();
    const p2:JQueryCoordinates = $target.position();

    return Math.abs(p1.top - p2.top);
};

/**
 * @param {boolean} vertical
 * @param {JQuery} $position
 * @param {JQuery} $target
 * @returns {number}
 */
const animationSpeed:Function = (vertical:boolean, $position:JQuery, $target:JQuery):number => {
    if (vertical) {
        return (verticalDistance($position, $target) / maxDistance()) * 3;
    }

    return (horizontalDistance($position, $target) / maxDistance()) * 3;
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const appear:HandlerInterface = ($value:JQuery):Promise<void> => {
    return new Promise<void>((resolve:Function):void => {
        const speed:string = 'a-speed--1';
        const helper:string = 'appear';

        prefixedEventListener($value, 'animationend', ():void => {
            $value.addClass('ready');
            $value.removeClass(`${helper}  ${speed}`);

            resolve();
        });

        $value.removeClass('ready');
        $value.addClass(`${helper}  ${speed}`);
    });
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const destroy:HandlerInterface = ($value:JQuery):Promise<void> => {
    return new Promise<void>((resolve:Function):void => {
        const speed:string = 'a-speed--1';
        const helper:string = 'destroy';

        prefixedEventListener($value, 'animationend', ():void => {
            $value.removeClass('ready');
            $value.removeClass(`${helper}  ${speed}`);

            resolve();
        });

        $value.addClass(`${helper}  ${speed}`);
    });
};

/**
 * @param {JQuery} $value
 * @param {string} speed
 * @param {PositionPropertyInterface} position
 */
const move:Function = ($value:JQuery, speed:string, position:PositionPropertyInterface):Promise<void> => {
    return new Promise<void>((resolve:Function):void => {
        const helper:string = 'a-move';

        prefixedEventListener($value, 'transitionend', ():void => {
            $value.removeClass(`${helper}  ${speed}`);

            resolve();
        });

        $value.addClass(`${helper}  ${speed}`);
        $value.css(position);
    });
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const moveTop:HandlerInterface = ($value:JQuery):Promise<void> => {
    const $target:JQuery = topLeftElement();
    const speed:string = `t-speed--${animationSpeed(true, $value, $target)}`;

    return move($value, speed, {
        top: topLeft().top
    });
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const moveRight:HandlerInterface = ($value:JQuery):Promise<void> => {
    const $target:JQuery = bottomRightElement();
    const speed:string = `t-speed--${animationSpeed(false, $value, $target)}`;

    return move($value, speed, {
        left: bottomRight().left
    });
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const moveBottom:HandlerInterface = ($value:JQuery):Promise<void> => {
    const $target:JQuery = bottomRightElement();
    const speed:string = `t-speed--${animationSpeed(true, $value, $target)}`;

    return move($value, speed, {
        top: bottomRight().top
    });
};

/**
 * @param {JQuery} $value
 * @returns {Promise}
 */
const moveLeft:HandlerInterface = ($value:JQuery):Promise<void> => {
    const $target:JQuery = topLeftElement();
    const speed:string = `t-speed--${animationSpeed(false, $value, $target)}`;

    return move($value, speed, {
        left: topLeft().left
    });
};

jQuery(($:JQueryStatic) => {
    const $value:JQuery = $('.js-value');
    let isBlocked:boolean = false;
    const handleClick:Function = (handler:HandlerInterface):void => {
        if (false === isBlocked) {
            isBlocked = true;

            handler($value).then(():void => {
                isBlocked = false;
            });
        } else {
            window.console.log('animation blocked');
        }
    };

    $value.css(topLeft());

    $('.js-control__appear').on('click', ():void => {
        handleClick(appear);
    });

    $('.js-control__destroy').on('click', ():void => {
        handleClick(destroy);
    });

    $('.js-control__top').on('click', ():void => {
        handleClick(moveTop);
    });

    $('.js-control__right').on('click', ():void => {
        handleClick(moveRight);
    });

    $('.js-control__bottom').on('click', ():void => {
        handleClick(moveBottom);
    });

    $('.js-control__left').on('click', ():void => {
        handleClick(moveLeft);
    });
});
