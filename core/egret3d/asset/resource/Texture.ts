namespace egret3d {
    /**
     * 纹理资源。
     */
    export abstract class BaseTexture extends GLTFAsset {
        protected _gltfTexture: GLTFTexture | null = null;
        protected _image: gltf.Image;
        protected _sampler: gltf.Sampler;
        /**
         * @internal
         */
        public _dirty: boolean = false;

        protected constructor(name: string, source: GLTF | ArrayBufferView | gltf.ImageSource | null,
            width: number, height: number,
            format?: gltf.TextureFormat, mipmap?: boolean,
            wrapS?: gltf.TextureWrap, wrapT?: gltf.TextureWrap,
            magFilter?: gltf.TextureFilter, minFilter?: gltf.TextureFilter,
            flipY?: boolean, premultiplyAlpha?: boolean, unpackAlignment?: gltf.TextureAlignment,
            type?: gltf.TextureDataType, anisotropy?: number,
        ) {
            super(name);

            if (ArrayBuffer.isView(source)) {
                this.config = GLTFAsset.createTextureConfig(); // TODO
            }
            else if (source && source.hasOwnProperty("version")) {
                this.config = source as GLTF;
            }
            else {
                this.config = GLTFAsset.createTextureConfig(); // TODO                
            }

            this._gltfTexture = this.config.textures![0] as GLTFTexture;
            const paperExtension = this._gltfTexture.extensions.paper!;
            // Sampler
            {
                this._sampler = this.config.samplers![this._gltfTexture.sampler as number];
                this._sampler.wrapS = wrapS || gltf.TextureWrap.REPEAT;
                this._sampler.wrapT = wrapT || gltf.TextureWrap.REPEAT;
                this._sampler.magFilter = magFilter || gltf.TextureFilter.NEAREST;
                this._sampler.minFilter = minFilter || gltf.TextureFilter.NEAREST;
            }
            let w = width;
            let h = height;
            {
                this._image = this.config.images![this._gltfTexture.source as number];
                if (ArrayBuffer.isView(source)) {
                    this._image.uri = source;
                }
                else if (source) {
                    const img = this._image.uri = source as gltf.ImageSource;
                    w = img.width;
                    h = img.height;
                }
            }
            paperExtension.width = w;
            paperExtension.height = h;

            paperExtension.format = format || gltf.TextureFormat.RGBA;
            paperExtension.premultiplyAlpha = premultiplyAlpha ? 1 : 0;
            paperExtension.unpackAlignment = unpackAlignment || gltf.TextureAlignment.Four;
            paperExtension.mipmap = mipmap || false;
            paperExtension.flipY = flipY ? 1 : 0;
            paperExtension.type = type || gltf.TextureDataType.UNSIGNED_BYTE;
            paperExtension.anisotropy = anisotropy || 1;

            this._dirty = true;
        }

        public setupTexture(index?: number): void { }

        public get width(): number {
            return this._gltfTexture!.extensions.paper!.width!;
        }

        public get height(): number {
            return this._gltfTexture!.extensions.paper!.height!;
        }

        public get format(): number {
            return this._gltfTexture!.extensions.paper!.format!;
        }

        public get gltfTexture(): GLTFTexture {
            return this._gltfTexture!;
        }
    }

    export class Texture extends BaseTexture {
        public static create(name: string, source: GLTF, width?: number, height?: number): Texture;
        public static create(name: string, source: ArrayBufferView | gltf.ImageSource, width: number, height: number, format?: gltf.TextureFormat): Texture;
        public static create(name: string, source: GLTF | ArrayBufferView | gltf.ImageSource, width: number, height: number,
            format?: gltf.TextureFormat, mipmap?: boolean,
            wrapS?: gltf.TextureWrap, wrapT?: gltf.TextureWrap,
            magFilter?: gltf.TextureFilter, minFilter?: gltf.TextureFilter,
            flipY?: boolean, premultiplyAlpha?: boolean, unpackAlignment?: gltf.TextureAlignment,
            type?: gltf.TextureDataType, anisotropy?: number,
        ): Texture;
        public static create(name: string, source: GLTF | ArrayBufferView | gltf.ImageSource | null, width: number, height: number,
            format?: gltf.TextureFormat, mipmap?: boolean,
            wrapS?: gltf.TextureWrap, wrapT?: gltf.TextureWrap,
            magFilter?: gltf.TextureFilter, minFilter?: gltf.TextureFilter,
            flipY?: boolean, premultiplyAlpha?: boolean, unpackAlignment?: gltf.TextureAlignment,
            type?: gltf.TextureDataType, anisotropy?: number): Texture {

            return new egret3d.Texture(name, source, width, height,
                format, mipmap,
                wrapS, wrapT,
                magFilter, minFilter,
                flipY, premultiplyAlpha, unpackAlignment,
                type, anisotropy);
        }
        public static createByImage(name: string, image: gltf.ImageSource, format: gltf.TextureFormat, mipmap: boolean, linear: boolean, repeat: boolean): Texture {
            let magFilter = gltf.TextureFilter.LINEAR;
            let minFilter = gltf.TextureFilter.LINEAR;
            const wrapS = repeat ? gltf.TextureWrap.REPEAT : gltf.TextureWrap.CLAMP_TO_EDGE;
            const wrapT = repeat ? gltf.TextureWrap.REPEAT : gltf.TextureWrap.CLAMP_TO_EDGE;
            if (mipmap) {
                magFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
                minFilter = linear ? gltf.TextureFilter.LINEAR_MIPMAP_LINEAR : gltf.TextureFilter.NEAREST_MIPMAP_NEAREST;
            }
            else {
                magFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
                minFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
            }
            const texture = egret3d.Texture.create(name, image, image.width, image.height,
                format, mipmap, wrapS, wrapT, magFilter, minFilter);

            return texture;
        }
        public static createByBitmapData(name: string, bitmapData: egret.BitmapData, format: gltf.TextureFormat, mipmap: boolean, linear: boolean, repeat: boolean): Texture {
            let magFilter = gltf.TextureFilter.LINEAR;
            let minFilter = gltf.TextureFilter.LINEAR;
            const wrapS = repeat ? gltf.TextureWrap.REPEAT : gltf.TextureWrap.CLAMP_TO_EDGE;
            const wrapT = repeat ? gltf.TextureWrap.REPEAT : gltf.TextureWrap.CLAMP_TO_EDGE;
            if (mipmap) {
                magFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
                minFilter = linear ? gltf.TextureFilter.LINEAR_MIPMAP_LINEAR : gltf.TextureFilter.NEAREST_MIPMAP_NEAREST;
            }
            else {
                magFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
                minFilter = linear ? gltf.TextureFilter.LINEAR : gltf.TextureFilter.NEAREST;
            }
            const texture = egret3d.Texture.create(name, bitmapData.source, bitmapData.source.width, bitmapData.source.height,
                format, mipmap, wrapS, wrapT, magFilter, minFilter);

            return texture;
        }
        public static createColorTexture(name: string, r: number, g: number, b: number): Texture {
            const mipmap = true;
            const width = 1;
            const height = 1;
            const data = new Uint8Array([r, g, b, 255]);
            const texture = Texture.create(name, data, width, height,
                gltf.TextureFormat.RGBA, mipmap,
                gltf.TextureWrap.CLAMP_TO_EDGE, gltf.TextureWrap.CLAMP_TO_EDGE,
                gltf.TextureFilter.LINEAR, gltf.TextureFilter.LINEAR_MIPMAP_LINEAR);

            return texture;
        }

        public static createGridTexture(name: string): Texture {
            const mipmap = true;
            const width = 128;
            const height = 128;
            const data = new Uint8Array(width * height * 4);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const seek = (y * width + x) * 4;
                    const bool = ((x - width * 0.5) * (y - height * 0.5)) > 0;
                    data[seek] = data[seek + 1] = data[seek + 2] = bool ? 0 : 255;
                    data[seek + 3] = 255;
                }
            }
            const texture = Texture.create(name, data, width, height,
                gltf.TextureFormat.RGBA, mipmap,
                gltf.TextureWrap.REPEAT, gltf.TextureWrap.REPEAT,
                gltf.TextureFilter.LINEAR, gltf.TextureFilter.LINEAR_MIPMAP_LINEAR);

            return texture;
        }
    }
}
