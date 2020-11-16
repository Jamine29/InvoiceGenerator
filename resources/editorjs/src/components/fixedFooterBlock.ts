export default class FixedFooterBlock {
  public static getFooterText(): string {
    /**
     * Getting footer text from value prperty of textarea with id fixed-footer-block
     */
    const footerText = document.getElementById('fixed-footer-block')['value'];

    /**
     * EditorJS.Sanitizer is not a property
     * There is no other way to sanitize data
     */

    return footerText;
  }
}
