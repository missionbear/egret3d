namespace egret3d {
    /**
     * @deprecated
     */
    export const RAD_DEG = Const.RAD_DEG;
    /**
     * @deprecated
     */
    export const DEG_RAD = Const.DEG_RAD;
    /**
     * @deprecated
     */
    export const EPSILON = Const.EPSILON;
    /**
     * @deprecated
     */
    export const floatClamp = math.clamp;
    /**
     * @deprecated
     */
    export const numberLerp = math.lerp;
    /**
     * @deprecated
     */
    export type AABB = Box;
    /**
     * @deprecated
     */
    export const AABB = Box;
    /**
     * @deprecated
     */
    export type Matrix = Matrix4;
    /**
     * @deprecated
     */
    export const Matrix = Matrix4;
    /**
     * @deprecated
     */
    export const Prefab = paper.Prefab;
    /**
     * @deprecated
     */
    export type Prefab = paper.Prefab;
    /**
     * @deprecated
     */
    export const RawScene = paper.RawScene;
    /**
     * @deprecated
     */
    export type RawScene = paper.RawScene;
    /**
     * @deprecated
     */
    export const InputManager = {
        /**
         * @deprecated
         * @see egret3d.inputCollecter
         */
        mouse: {
            /**
             * @deprecated
             * @see egret3d.inputCollecter.defaultPointer.isHold()
             */
            isPressed: function (button: number) {
                const buttons = [egret3d.PointerButtonsType.LeftMouse, egret3d.PointerButtonsType.MiddleMouse, egret3d.PointerButtonsType.RightMouse];
                return egret3d.inputCollecter.defaultPointer.isHold(buttons[button]);
            },
            /**
             * @deprecated
             * @see egret3d.inputCollecter.defaultPointer.isDown()
             */
            wasPressed: function (button: number) {
                const buttons = [egret3d.PointerButtonsType.LeftMouse, egret3d.PointerButtonsType.MiddleMouse, egret3d.PointerButtonsType.RightMouse];
                return egret3d.inputCollecter.defaultPointer.isDown(buttons[button]);
            },
            /**
             * @deprecated
             * @see egret3d.inputCollecter.defaultPointer.isUp()
             */
            wasReleased: function (button: number) {
                const buttons = [egret3d.PointerButtonsType.LeftMouse, egret3d.PointerButtonsType.MiddleMouse, egret3d.PointerButtonsType.RightMouse];
                return egret3d.inputCollecter.defaultPointer.isUp(buttons[button]);
            },
        },
        /**
         * @deprecated
         * @see egret3d.inputCollecter
         */
        touch: {
            /**
             * @deprecated
             * @see egret3d.inputCollecter.defaultPointer
             */
            getTouch: function (button: number) {
                return inputCollecter.getHoldPointers()[button];
            },
        },
        /**
         * @deprecated
         * @see egret3d.inputCollecter
         */
        keyboard: {
            /**
             * @deprecated
             * @see egret3d.inputCollecter.getKey()
             */
            isPressed: function (key: string | number) {
                return egret3d.inputCollecter.getKey(key as any).isHold();
            },
            /**
             * @deprecated
             * @see egret3d.inputCollecter.getKey()
             */
            wasPressed: function (key: string | number) {
                return egret3d.inputCollecter.getKey(key as any).isUp();
            },
        },
    };
}