var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var ScriptLoader = React.createClass({
    mixins: [ReactScriptLoaderMixin],
    getInitialState: function() {
        return {
            scriptLoading: true,
            scriptLoadError: false,
        };
    },

    // this function tells ReactScriptLoaderMixin where to load the script from
    getScriptURL: function() {
        return 'https://cdn.pilixo.com/assets/application-96613b635dc27232ddc029e0200140da.js';
    },

    // ReactScriptLoaderMixin calls this function when the script has loaded
    // successfully.
    onScriptLoaded: function() {
        this.setState({scriptLoading: false});
    },

    // ReactScriptLoaderMixin calls this function when the script has failed to load.
    onScriptError: function() {
        this.setState({scriptLoading: false, scriptLoadError: true});
    },

    render: function() {
        var message;
        if (this.state.scriptLoading) {
            message = 'loading script...';
        } else if (this.state.scriptLoadError) {
            message = 'loading failed';
        } else {
            message = 'loading succeeded';
        }
        return <span>{message}</span>;
    }
});

module.exports = ScriptLoader;