// flow-typed signature: c77c3800e8bd308639c40bf4e12367c7
// flow-typed version: 00a1319cbd/nprogress_v0.2.0/flow_>=v0.25.x

declare module "nprogress" {
  declare type NProgressStatic = {
    /**
     * Shows the progress bar and begins trickling progress.
     * @returns {NProgressStatic} The current NProgress object, useful for chaining.
     */
    start(): NProgressStatic,

    /**
     * Finishes loading by transitioning it to 100%, then fading out.
     * @param {boolean} forceShow Forces the progress bar to show, even if it's not being shown. (The default behavior is that .done() will not do anything if .start() isn't called.)
     * @returns {NProgressStatic} The current NProgress object, useful for chaining.
     */
    done(forceShow?: boolean): NProgressStatic,

    /**
     * Increments the progress bar with a set amount, or a random amount if not provided.
     * @param {number} amount This will get the current status value and adds the value until status is max 0.994
     * @returns {NProgressStatic} The current NProgress object, useful for chaining.
     */
    inc(amount?: number): NProgressStatic,

    /**
     * Removes the progress indicator.
     */
    remove(): void,

    /**
     * Sets the progress percentage.
     * @param {number} progressPercent A number between 0.0 and 1.0 that represents the progress percentage.
     * @returns {NProgressStatic} The current NProgress object, useful for chaining.
     */
    set(progressPercent: number): NProgressStatic,

    /**
     * Configures the progress indicator.
     * @param {NProgressConfigureOptions} options An object containing the configuration options.
     * @returns {NProgressStatic} The current NProgress object, useful for chaining.
     */
    configure(options: NProgressConfigureOptions): NProgressStatic,

    /**
     * Gets the NProgress version.
     */
    version: string,

    /**
     * Gets the status. If started, it will be the last progress number set.
     */
    status: number | null,

    /**
     * Gets whether progress has been started.
     * @returns {boolean} Whether the progress has started.
     */
    isStarted(): boolean
  };

  declare type NProgressConfigureOptions = {|
    /**
     * CSS selector to change the parent DOM element of the progress. Default is body.
     */
    parent?: string,

    /**
     * The minimum progress percentage. Default is 0.08.
     */
    minimum?: number,

    /**
     * Whether to enable trickling the progress. Default is true.
     */
    trickle?: boolean,

    /**
     * How often to trickle, in milliseconds. Default is 800.
     */
    trickleSpeed?: number,

    /**
     * Whether to show the spinner. Defaults to true. Default is true.
     */
    showSpinner?: boolean,

    /**
     * The CSS easing animation to use. Default is 'linear'.
     */
    easing?: string,

    /**
     * The animation speed in milliseconds. Default is 200.
     */
    speed?: number,

    /**
     * The HTML markup inserted for the progress indicator. To keep the progress bar working, keep an element with role='bar' in there.
     */
    template?: string
  |};

  declare module.exports: NProgressStatic;
}
