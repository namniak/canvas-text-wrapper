
export function CanvasTextWrapper(element: HTMLCanvasElement, text: string, options?: CanvasTextWrapperOptions): void;

export interface CanvasTextWrapperOptions {
   /**
    *  Text style that includes font size (in px), font weight, font family, etc.
    */
   font?: string,
   /**
    * Number - 'n' times font size where 1 is equivalent to '100%'. Also the property can be set in '%' or 'px'.
    */
   lineHeight?: string | number,
   /**
    * Horizontal alignment of each line.
    */
   textAlign?: "left" | "center" | "right",
   /**
    * Vertical alignment of the whole text block.
    */
   verticalAlign?: "top" | "middle" | "bottom",
   /**
    * Horizontal padding (in px) that is equally set on left and right sides.
    */
   paddingX?: number,
   /**
    * Vertical padding (in px) that is equally set on top and bottoms.
    */
   paddingY?: number,
   /**
    * Fit canvas' container size instead of its own size.
    */
   fitParent?: boolean,
   /**
    * "auto" - text goes to the next line on a whole word when there's no room
    * "word" - each next word is placed on a new line
    */
   lineBreak?: "auto" | "word",
   /**
    * Ignore given font size and line height and resize text to fill its padded container.
    */
   sizeToFill?: boolean,
   /**
    * If above option is true text won't be bigger than set.
    */
   maxFontSizeToFill?: number,
   /**
    * Allow text outline based on canvas context configuration.
    */
   strokeText?: boolean,
   /**
    * All lines will try to match the same width with flexed spaces between the words.
    */
   justifyLines?: boolean,
   /**
    * Text breaks on a new line character "\n". Supports multiple consecutive new lines.
    */
   allowNewLine?: boolean,
   /**
    * Text is rendered based on device pixel ratio.
    */
   renderHDPI?: boolean,
   /**
    * Text is underlined according to context.strokeStyle and context.lineWidth
    */
   textDecoration?: "none" | "underline"
}

