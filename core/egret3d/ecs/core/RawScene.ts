namespace paper {
    /**
     * 场景资源。
     */
    export class RawScene extends BasePrefabAsset {
        /**
         * @internal
         */
        public createInstance(keepUUID: boolean = false) {
            if (!this._raw) {
                return null;
            }

            const isEditor = Application.playerMode === PlayerMode.Editor;
            const deserializer = new paper.Deserializer();
            const scene = deserializer.deserialize(this._raw, keepUUID) as Scene | null;

            if (scene && isEditor) {

            }

            return scene;
        }
    }
}