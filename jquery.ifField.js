    (function () {
        var SimpleDeferred = function () {
            this.isPromised = false;
            this.isResolved = false;
            this.isRejected = false;
            this.successCallbacks = [];
            this.failCallbacks = [];
            this.resolveArgs = [];
            this.rejectArgs = [];
        };
        SimpleDeferred.prototype.resolve = function () {
            this.resolveArgs = arguments;
            if (this.isPromised) {
                this.callCallbacks(true);
            }
            this.isRejected = false;
            this.isResolved = true;
        };
        SimpleDeferred.prototype.reject = function () {
            this.rejectArgs = arguments;
            if (this.isPromised) {
                this.callCallbacks(false);
            }
            this.isResolved = false;
            this.isRejected = true;
        };
        SimpleDeferred.prototype.callCallbacks = function (success) {
            var self = this;
            (success ? this.successCallbacks : this.failCallbacks).forEach(function (callback) {
                callback.apply(null, success ? self.resolveArgs : self.rejectArgs);
            });
        };
        SimpleDeferred.prototype.done = function (callback) {
            if (this.isResolved) {
                callback.apply(null, self.resolveArgs);
            }
            this.successCallbacks.push(callback);
        };
        SimpleDeferred.prototype.fail = function (callback) {
            if (this.isRejected) {
                callback.apply(null, self.rejectArgs);
            }
            this.failCallbacks.push(callback);
        };
        SimpleDeferred.prototype.promise = function () {
            this.isPromised = true;
            if (this.isResolved) {
                this.callCallbacks(true)
            } else if (this.isRejected) {
                this.callCallbacks(false);
            }
            return this;
        };

        function resolveComparison($element, compareCallback, deferredObj) {
            if (compareCallback($element)) {
                deferredObj.resolve($element);
            } else {
                deferredObj.reject($element);
            }
        }

        $.fn.ifField = function (compareCallback, immediateCheck) {
            immediateCheck || (immediateCheck = false);

            var $self = this,
                deferred = new SimpleDeferred(),
                chainObject = {
                    then: function (callback) {
                        deferred.done(callback);
                        return this;
                    },
                    otherwise: function (callback) {
                        deferred.fail(callback);
                        return this;
                    },
                    elseif: function (compareCallback, immediateCheck) {
                        return $.fn.ifField.call($self, compareCallback, immediateCheck);
                    }
                };
            this.each(function (key, $selfItem) {
                $selfItem = $($selfItem);
                if (immediateCheck) {
                    resolveComparison($selfItem, compareCallback, deferred);
                }
                $selfItem.on('change', function () {
                    resolveComparison($(this), compareCallback, deferred);
                });
            });

            deferred.promise();
            return chainObject;
        };
    }());
