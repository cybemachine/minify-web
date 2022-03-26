var o = ((e, t) => () => (t || e((t = {
    exports: {}
}).exports, t), t.exports))((e, t) => {
    var r, i = function (e) {
        var t = new i.Builder;
        return t.pipeline.add(i.trimmer, i.stopWordFilter, i.stemmer), t.searchPipeline.add(i.stemmer), e.call(t, t), t.build()
    };
    i.version = "2.3.9", i.utils = {}, i.utils.warn = (r = this, function (e) {
        r.console && console.warn && console.warn(e)
    }), i.utils.asString = function (e) {
        return null == e ? "" : e.toString()
    }, i.utils.clone = function (e) {
        if (null == e) return e;
        for (var t = Object.create(null), r = Object.keys(e), i = 0; i < r.length; i++) {
            var s = r[i],
                n = e[s];
            if (Array.isArray(n)) t[s] = n.slice();
            else {
                if ("string" != typeof n && "number" != typeof n && "boolean" != typeof n) throw new TypeError("clone is not deep and does not support nested objects");
                t[s] = n
            }
        }
        return t
    }, i.FieldRef = function (e, t, r) {
        this.docRef = e, this.fieldName = t, this._stringValue = r
    }, i.FieldRef.joiner = "/", i.FieldRef.fromString = function (e) {
        var t = e.indexOf(i.FieldRef.joiner);
        if (-1 === t) throw "malformed field ref string";
        var r = e.slice(0, t),
            s = e.slice(t + 1);
        return new i.FieldRef(s, r, e)
    }, i.FieldRef.prototype.toString = function () {
        return null == this._stringValue && (this._stringValue = this.fieldName + i.FieldRef.joiner + this.docRef), this._stringValue
    }, i.Set = function (e) {
        if (this.elements = Object.create(null), e) {
            this.length = e.length;
            for (var t = 0; t < this.length; t++) this.elements[e[t]] = !0
        } else this.length = 0
    }, i.Set.complete = {
        intersect: function (e) {
            return e
        },
        union: function () {
            return this
        },
        contains: function () {
            return !0
        }
    }, i.Set.empty = {
        intersect: function () {
            return this
        },
        union: function (e) {
            return e
        },
        contains: function () {
            return !1
        }
    }, i.Set.prototype.contains = function (e) {
        return !!this.elements[e]
    }, i.Set.prototype.intersect = function (e) {
        var t, r, s, n = [];
        if (e === i.Set.complete) return this;
        if (e === i.Set.empty) return e;
        this.length < e.length ? (t = this, r = e) : (t = e, r = this), s = Object.keys(t.elements);
        for (var o = 0; o < s.length; o++) {
            var a = s[o];
            a in r.elements && n.push(a)
        }
        return new i.Set(n)
    }, i.Set.prototype.union = function (e) {
        return e === i.Set.complete ? i.Set.complete : e === i.Set.empty ? this : new i.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))
    }, i.idf = function (e, t) {
        var r = 0;
        for (var i in e) "_index" != i && (r += Object.keys(e[i]).length);
        var s = (t - r + .5) / (r + .5);
        return Math.log(1 + Math.abs(s))
    }, i.Token = function (e, t) {
        this.str = e || "", this.metadata = t || {}
    }, i.Token.prototype.toString = function () {
        return this.str
    }, i.Token.prototype.update = function (e) {
        return this.str = e(this.str, this.metadata), this
    }, i.Token.prototype.clone = function (e) {
        return e = e || function (e) {
            return e
        }, new i.Token(e(this.str, this.metadata), this.metadata)
    }, i.tokenizer = function (e, t) {
        if (null == e || null == e) return [];
        if (Array.isArray(e)) return e.map(function (e) {
            return new i.Token(i.utils.asString(e).toLowerCase(), i.utils.clone(t))
        });
        for (var r = e.toString().toLowerCase(), s = r.length, n = [], o = 0, a = 0; o <= s; o++) {
            var l = o - a;
            if (r.charAt(o).match(i.tokenizer.separator) || o == s) {
                if (l > 0) {
                    var u = i.utils.clone(t) || {};
                    u.position = [a, l], u.index = n.length, n.push(new i.Token(r.slice(a, o), u))
                }
                a = o + 1
            }
        }
        return n
    }, i.tokenizer.separator = /[\s\-]+/, i.Pipeline = function () {
        this._stack = []
    }, i.Pipeline.registeredFunctions = Object.create(null), i.Pipeline.registerFunction = function (e, t) {
        t in this.registeredFunctions && i.utils.warn("Overwriting existing registered function: " + t), e.label = t, i.Pipeline.registeredFunctions[e.label] = e
    }, i.Pipeline.warnIfFunctionNotRegistered = function (e) {
        e.label && e.label in this.registeredFunctions || i.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", e)
    }, i.Pipeline.load = function (e) {
        var t = new i.Pipeline;
        return e.forEach(function (e) {
            var r = i.Pipeline.registeredFunctions[e];
            if (!r) throw new Error("Cannot load unregistered function: " + e);
            t.add(r)
        }), t
    }, i.Pipeline.prototype.add = function () {
        Array.prototype.slice.call(arguments).forEach(function (e) {
            i.Pipeline.warnIfFunctionNotRegistered(e), this._stack.push(e)
        }, this)
    }, i.Pipeline.prototype.after = function (e, t) {
        i.Pipeline.warnIfFunctionNotRegistered(t);
        var r = this._stack.indexOf(e);
        if (-1 == r) throw new Error("Cannot find existingFn");
        r += 1, this._stack.splice(r, 0, t)
    }, i.Pipeline.prototype.before = function (e, t) {
        i.Pipeline.warnIfFunctionNotRegistered(t);
        var r = this._stack.indexOf(e);
        if (-1 == r) throw new Error("Cannot find existingFn");
        this._stack.splice(r, 0, t)
    }, i.Pipeline.prototype.remove = function (e) {
        var t = this._stack.indexOf(e); - 1 != t && this._stack.splice(t, 1)
    }, i.Pipeline.prototype.run = function (e) {
        for (var t = this._stack.length, r = 0; r < t; r++) {
            for (var i = this._stack[r], s = [], n = 0; n < e.length; n++) {
                var o = i(e[n], n, e);
                if (null != o && "" !== o)
                    if (Array.isArray(o))
                        for (var a = 0; a < o.length; a++) s.push(o[a]);
                    else s.push(o)
            }
            e = s
        }
        return e
    }, i.Pipeline.prototype.runString = function (e, t) {
        var r = new i.Token(e, t);
        return this.run([r]).map(function (e) {
            return e.toString()
        })
    }, i.Pipeline.prototype.reset = function () {
        this._stack = []
    }, i.Pipeline.prototype.toJSON = function () {
        return this._stack.map(function (e) {
            return i.Pipeline.warnIfFunctionNotRegistered(e), e.label
        })
    }, i.Vector = function (e) {
        this._magnitude = 0, this.elements = e || []
    }, i.Vector.prototype.positionForIndex = function (e) {
        if (0 == this.elements.length) return 0;
        for (var t = 0, r = this.elements.length / 2, i = r - t, s = Math.floor(i / 2), n = this.elements[2 * s]; i > 1 && (n < e && (t = s), n > e && (r = s), n != e);) i = r - t, s = t + Math.floor(i / 2), n = this.elements[2 * s];
        return n == e || n > e ? 2 * s : n < e ? 2 * (s + 1) : void 0
    }, i.Vector.prototype.insert = function (e, t) {
        this.upsert(e, t, function () {
            throw "duplicate index"
        })
    }, i.Vector.prototype.upsert = function (e, t, r) {
        this._magnitude = 0;
        var i = this.positionForIndex(e);
        this.elements[i] == e ? this.elements[i + 1] = r(this.elements[i + 1], t) : this.elements.splice(i, 0, e, t)
    }, i.Vector.prototype.magnitude = function () {
        if (this._magnitude) return this._magnitude;
        for (var e = 0, t = this.elements.length, r = 1; r < t; r += 2) {
            var i = this.elements[r];
            e += i * i
        }
        return this._magnitude = Math.sqrt(e)
    }, i.Vector.prototype.dot = function (e) {
        for (var t = 0, r = this.elements, i = e.elements, s = r.length, n = i.length, o = 0, a = 0, l = 0, u = 0; l < s && u < n;)(o = r[l]) < (a = i[u]) ? l += 2 : o > a ? u += 2 : o == a && (t += r[l + 1] * i[u + 1], l += 2, u += 2);
        return t
    }, i.Vector.prototype.similarity = function (e) {
        return this.dot(e) / this.magnitude() || 0
    }, i.Vector.prototype.toArray = function () {
        for (var e = new Array(this.elements.length / 2), t = 1, r = 0; t < this.elements.length; t += 2, r++) e[r] = this.elements[t];
        return e
    }, i.Vector.prototype.toJSON = function () {
        return this.elements
    }, i.stemmer = function () {
        var e = {
            ational: "ate",
            tional: "tion",
            enci: "ence",
            anci: "ance",
            izer: "ize",
            bli: "ble",
            alli: "al",
            entli: "ent",
            eli: "e",
            ousli: "ous",
            ization: "ize",
            ation: "ate",
            ator: "ate",
            alism: "al",
            iveness: "ive",
            fulness: "ful",
            ousness: "ous",
            aliti: "al",
            iviti: "ive",
            biliti: "ble",
            logi: "log"
        },
            t = {
                icate: "ic",
                ative: "",
                alize: "al",
                iciti: "ic",
                ical: "ic",
                ful: "",
                ness: ""
            },
            r = "[aeiouy]",
            i = "[^aeiou][^aeiouy]*",
            s = new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),
            n = new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),
            o = new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),
            a = new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),
            l = /^(.+?)(ss|i)es$/,
            u = /^(.+?)([^s])s$/,
            c = /^(.+?)eed$/,
            d = /^(.+?)(ed|ing)$/,
            h = /.$/,
            f = /(at|bl|iz)$/,
            p = new RegExp("([^aeiouylsz])\\1$"),
            m = new RegExp("^" + i + r + "[^aeiouwxy]$"),
            y = /^(.+?[^aeiou])y$/,
            g = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,
            v = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,
            x = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,
            w = /^(.+?)(s|t)(ion)$/,
            L = /^(.+?)e$/,
            E = /ll$/,
            b = new RegExp("^" + i + r + "[^aeiouwxy]$"),
            k = function (r) {
                var i, k, S, Q, T, P, O;
                if (r.length < 3) return r;
                if ("y" == (S = r.substr(0, 1)) && (r = S.toUpperCase() + r.substr(1)), T = u, (Q = l).test(r) ? r = r.replace(Q, "$1$2") : T.test(r) && (r = r.replace(T, "$1$2")), T = d, (Q = c).test(r)) {
                    var I = Q.exec(r);
                    (Q = s).test(I[1]) && (Q = h, r = r.replace(Q, ""))
                } else T.test(r) && (i = (I = T.exec(r))[1], (T = a).test(i) && (P = p, O = m, (T = f).test(r = i) ? r += "e" : P.test(r) ? (Q = h, r = r.replace(Q, "")) : O.test(r) && (r += "e")));
                return (Q = y).test(r) && (r = (i = (I = Q.exec(r))[1]) + "i"), (Q = g).test(r) && (i = (I = Q.exec(r))[1], k = I[2], (Q = s).test(i) && (r = i + e[k])), (Q = v).test(r) && (i = (I = Q.exec(r))[1], k = I[2], (Q = s).test(i) && (r = i + t[k])), T = w, (Q = x).test(r) ? (i = (I = Q.exec(r))[1], (Q = n).test(i) && (r = i)) : T.test(r) && (i = (I = T.exec(r))[1] + I[2], (T = n).test(i) && (r = i)), (Q = L).test(r) && (i = (I = Q.exec(r))[1], T = o, P = b, ((Q = n).test(i) || T.test(i) && !P.test(i)) && (r = i)), T = n, (Q = E).test(r) && T.test(r) && (Q = h, r = r.replace(Q, "")), "y" == S && (r = S.toLowerCase() + r.substr(1)), r
            };
        return e => e.update(k)
    }(), i.Pipeline.registerFunction(i.stemmer, "stemmer"), i.generateStopWordFilter = function (e) {
        var t = e.reduce((e, t) => e[t] = t, e, {});
        return e => {
            if (e && t[e.toString()] !== e.toString()) return e
        }
    }, i.stopWordFilter = i.generateStopWordFilter(["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"]), i.Pipeline.registerFunction(i.stopWordFilter, "stopWordFilter"), i.trimmer = function (e) {
        return e.update(function (e) {
            return e.replace(/^\W+/, "").replace(/\W+$/, "")
        })
    }, i.Pipeline.registerFunction(i.trimmer, "trimmer"), i.TokenSet = function () {
        this.final = !1, this.edges = {}, this.id = i.TokenSet._nextId, i.TokenSet._nextId += 1
    }, i.TokenSet._nextId = 1, i.TokenSet.fromArray = function (e) {
        for (var t = new i.TokenSet.Builder, r = 0, s = e.length; r < s; r++) t.insert(e[r]);
        return t.finish(), t.root
    }, i.TokenSet.fromClause = function (e) {
        return "editDistance" in e ? i.TokenSet.fromFuzzyString(e.term, e.editDistance) : i.TokenSet.fromString(e.term)
    }, i.TokenSet.fromFuzzyString = function (e, t) {
        for (var r = new i.TokenSet, s = [{
            node: r,
            editsRemaining: t,
            str: e
        }]; s.length;) {
            var n = s.pop();
            if (n.str.length > 0) {
                var o, a = n.str.charAt(0);
                a in n.node.edges ? o = n.node.edges[a] : (o = new i.TokenSet, n.node.edges[a] = o), 1 == n.str.length && (o.final = !0), s.push({
                    node: o,
                    editsRemaining: n.editsRemaining,
                    str: n.str.slice(1)
                })
            }
            if (0 != n.editsRemaining) {
                if ("*" in n.node.edges) var l = n.node.edges["*"];
                else l = new i.TokenSet, n.node.edges["*"] = l;
                if (0 == n.str.length && (l.final = !0), s.push({
                    node: l,
                    editsRemaining: n.editsRemaining - 1,
                    str: n.str
                }), n.str.length > 1 && s.push({
                    node: n.node,
                    editsRemaining: n.editsRemaining - 1,
                    str: n.str.slice(1)
                }), 1 == n.str.length && (n.node.final = !0), n.str.length >= 1) {
                    if ("*" in n.node.edges) var u = n.node.edges["*"];
                    else u = new i.TokenSet, n.node.edges["*"] = u;
                    1 == n.str.length && (u.final = !0), s.push({
                        node: u,
                        editsRemaining: n.editsRemaining - 1,
                        str: n.str.slice(1)
                    })
                }
                if (n.str.length > 1) {
                    var c, d = n.str.charAt(0),
                        h = n.str.charAt(1);
                    h in n.node.edges ? c = n.node.edges[h] : (c = new i.TokenSet, n.node.edges[h] = c), 1 == n.str.length && (c.final = !0), s.push({
                        node: c,
                        editsRemaining: n.editsRemaining - 1,
                        str: d + n.str.slice(2)
                    })
                }
            }
        }
        return r
    }, i.TokenSet.fromString = function (e) {
        for (var t = new i.TokenSet, r = t, s = 0, n = e.length; s < n; s++) {
            var o = e[s],
                a = s == n - 1;
            if ("*" == o) t.edges[o] = t, t.final = a;
            else {
                var l = new i.TokenSet;
                l.final = a, t.edges[o] = l, t = l
            }
        }
        return r
    }, i.TokenSet.prototype.toArray = function () {
        for (var e = [], t = [{
            prefix: "",
            node: this
        }]; t.length;) {
            var r = t.pop(),
                i = Object.keys(r.node.edges),
                s = i.length;
            r.node.final && (r.prefix.charAt(0), e.push(r.prefix));
            for (var n = 0; n < s; n++) {
                var o = i[n];
                t.push({
                    prefix: r.prefix.concat(o),
                    node: r.node.edges[o]
                })
            }
        }
        return e
    }, i.TokenSet.prototype.toString = function () {
        if (this._str) return this._str;
        for (var e = this.final ? "1" : "0", t = Object.keys(this.edges).sort(), r = t.length, i = 0; i < r; i++) {
            var s = t[i];
            e = e + s + this.edges[s].id
        }
        return e
    }, i.TokenSet.prototype.intersect = function (e) {
        for (var t = new i.TokenSet, r = void 0, s = [{
            qNode: e,
            output: t,
            node: this
        }]; s.length;) {
            r = s.pop();
            for (var n = Object.keys(r.qNode.edges), o = n.length, a = Object.keys(r.node.edges), l = a.length, u = 0; u < o; u++)
                for (var c = n[u], d = 0; d < l; d++) {
                    var h = a[d];
                    if (h == c || "*" == c) {
                        var f = r.node.edges[h],
                            p = r.qNode.edges[c],
                            m = f.final && p.final,
                            y = void 0;
                        h in r.output.edges ? (y = r.output.edges[h]).final = y.final || m : ((y = new i.TokenSet).final = m, r.output.edges[h] = y), s.push({
                            qNode: p,
                            output: y,
                            node: f
                        })
                    }
                }
        }
        return t
    }, i.TokenSet.Builder = function () {
        this.previousWord = "", this.root = new i.TokenSet, this.uncheckedNodes = [], this.minimizedNodes = {}
    }, i.TokenSet.Builder.prototype.insert = function (e) {
        var t, r = 0;
        if (e < this.previousWord) throw new Error("Out of order word insertion");
        for (var s = 0; s < e.length && s < this.previousWord.length && e[s] == this.previousWord[s]; s++) r++;
        for (this.minimize(r), t = 0 == this.uncheckedNodes.length ? this.root : this.uncheckedNodes[this.uncheckedNodes.length - 1].child, s = r; s < e.length; s++) {
            var n = new i.TokenSet,
                o = e[s];
            t.edges[o] = n, this.uncheckedNodes.push({
                parent: t,
                char: o,
                child: n
            }), t = n
        }
        t.final = !0, this.previousWord = e
    }, i.TokenSet.Builder.prototype.finish = function () {
        this.minimize(0)
    }, i.TokenSet.Builder.prototype.minimize = function (e) {
        for (var t = this.uncheckedNodes.length - 1; t >= e; t--) {
            var r = this.uncheckedNodes[t],
                i = r.child.toString();
            i in this.minimizedNodes ? r.parent.edges[r.char] = this.minimizedNodes[i] : (r.child._str = i, this.minimizedNodes[i] = r.child), this.uncheckedNodes.pop()
        }
    }, i.Index = function (e) {
        this.invertedIndex = e.invertedIndex, this.fieldVectors = e.fieldVectors, this.tokenSet = e.tokenSet, this.fields = e.fields, this.pipeline = e.pipeline
    }, i.Index.prototype.search = function (e) {
        return this.query(function (t) {
            new i.QueryParser(e, t).parse()
        })
    }, i.Index.prototype.query = function (e) {
        for (var t = new i.Query(this.fields), r = Object.create(null), s = Object.create(null), n = Object.create(null), o = Object.create(null), a = Object.create(null), l = 0; l < this.fields.length; l++) s[this.fields[l]] = new i.Vector;
        for (e.call(t, t), l = 0; l < t.clauses.length; l++) {
            var u, c = t.clauses[l],
                d = i.Set.empty;
            u = c.usePipeline ? this.pipeline.runString(c.term, {
                fields: c.fields
            }) : [c.term];
            for (var h = 0; h < u.length; h++) {
                var f = u[h];
                c.term = f;
                var p = i.TokenSet.fromClause(c),
                    m = this.tokenSet.intersect(p).toArray();
                if (0 === m.length && c.presence === i.Query.presence.REQUIRED) {
                    for (var y = 0; y < c.fields.length; y++) o[C = c.fields[y]] = i.Set.empty;
                    break
                }
                for (var g = 0; g < m.length; g++) {
                    var v = m[g],
                        x = this.invertedIndex[v],
                        w = x._index;
                    for (y = 0; y < c.fields.length; y++) {
                        var L = x[C = c.fields[y]],
                            E = Object.keys(L),
                            b = v + "/" + C,
                            k = new i.Set(E);
                        if (c.presence == i.Query.presence.REQUIRED && (d = d.union(k), void 0 === o[C] && (o[C] = i.Set.complete)), c.presence != i.Query.presence.PROHIBITED) {
                            if (s[C].upsert(w, c.boost, function (e, t) {
                                return e + t
                            }), !n[b]) {
                                for (var S = 0; S < E.length; S++) {
                                    var Q, T = E[S],
                                        P = new i.FieldRef(T, C),
                                        O = L[T];
                                    void 0 === (Q = r[P]) ? r[P] = new i.MatchData(v, C, O) : Q.add(v, C, O)
                                }
                                n[b] = !0
                            }
                        } else void 0 === a[C] && (a[C] = i.Set.empty), a[C] = a[C].union(k)
                    }
                }
            }
            if (c.presence === i.Query.presence.REQUIRED)
                for (y = 0; y < c.fields.length; y++) o[C = c.fields[y]] = o[C].intersect(d)
        }
        var I = i.Set.complete,
            R = i.Set.empty;
        for (l = 0; l < this.fields.length; l++) {
            var C;
            o[C = this.fields[l]] && (I = I.intersect(o[C])), a[C] && (R = R.union(a[C]))
        }
        var F = Object.keys(r),
            D = [],
            j = Object.create(null);
        if (t.isNegated())
            for (F = Object.keys(this.fieldVectors), l = 0; l < F.length; l++) {
                P = F[l];
                var N = i.FieldRef.fromString(P);
                r[P] = new i.MatchData
            }
        for (l = 0; l < F.length; l++) {
            var _ = (N = i.FieldRef.fromString(F[l])).docRef;
            if (I.contains(_) && !R.contains(_)) {
                var A, z = this.fieldVectors[N],
                    V = s[N.fieldName].similarity(z);
                if (void 0 !== (A = j[_])) A.score += V, A.matchData.combine(r[N]);
                else {
                    var B = {
                        ref: _,
                        score: V,
                        matchData: r[N]
                    };
                    j[_] = B, D.push(B)
                }
            }
        }
        return D.sort(function (e, t) {
            return t.score - e.score
        })
    }, i.Index.prototype.toJSON = function () {
        var e = Object.keys(this.invertedIndex).sort().map(function (e) {
            return [e, this.invertedIndex[e]]
        }, this),
            t = Object.keys(this.fieldVectors).map(function (e) {
                return [e, this.fieldVectors[e].toJSON()]
            }, this);
        return {
            version: i.version,
            fields: this.fields,
            fieldVectors: t,
            invertedIndex: e,
            pipeline: this.pipeline.toJSON()
        }
    }, i.Index.load = function (e) {
        var t = {},
            r = {},
            s = e.fieldVectors,
            n = Object.create(null),
            o = e.invertedIndex,
            a = new i.TokenSet.Builder,
            l = i.Pipeline.load(e.pipeline);
        e.version != i.version && i.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + i.version + "' does not match serialized index '" + e.version + "'");
        for (var u = 0; u < s.length; u++) {
            var c = (h = s[u])[0],
                d = h[1];
            r[c] = new i.Vector(d)
        }
        for (u = 0; u < o.length; u++) {
            var h, f = (h = o[u])[0],
                p = h[1];
            a.insert(f), n[f] = p
        }
        return a.finish(), t.fields = e.fields, t.fieldVectors = r, t.invertedIndex = n, t.tokenSet = a.root, t.pipeline = l, new i.Index(t)
    }, i.Builder = function () {
        this._ref = "id", this._fields = Object.create(null), this._documents = Object.create(null), this.invertedIndex = Object.create(null), this.fieldTermFrequencies = {}, this.fieldLengths = {}, this.tokenizer = i.tokenizer, this.pipeline = new i.Pipeline, this.searchPipeline = new i.Pipeline, this.documentCount = 0, this._b = .75, this._k1 = 1.2, this.termIndex = 0, this.metadataWhitelist = []
    }, i.Builder.prototype.ref = function (e) {
        this._ref = e
    }, i.Builder.prototype.field = function (e, t) {
        if (/\//.test(e)) throw new RangeError("Field '" + e + "' contains illegal character '/'");
        this._fields[e] = t || {}
    }, i.Builder.prototype.b = function (e) {
        this._b = e < 0 ? 0 : e > 1 ? 1 : e
    }, i.Builder.prototype.k1 = function (e) {
        this._k1 = e
    }, i.Builder.prototype.add = function (e, t) {
        var r = e[this._ref],
            s = Object.keys(this._fields);
        this._documents[r] = t || {}, this.documentCount += 1;
        for (var n = 0; n < s.length; n++) {
            var o = s[n],
                a = this._fields[o].extractor,
                l = a ? a(e) : e[o],
                u = this.tokenizer(l, {
                    fields: [o]
                }),
                c = this.pipeline.run(u),
                d = new i.FieldRef(r, o),
                h = Object.create(null);
            this.fieldTermFrequencies[d] = h, this.fieldLengths[d] = 0, this.fieldLengths[d] += c.length;
            for (var f = 0; f < c.length; f++) {
                var p = c[f];
                if (null == h[p] && (h[p] = 0), h[p] += 1, null == this.invertedIndex[p]) {
                    var m = Object.create(null);
                    m._index = this.termIndex, this.termIndex += 1;
                    for (var y = 0; y < s.length; y++) m[s[y]] = Object.create(null);
                    this.invertedIndex[p] = m
                }
                null == this.invertedIndex[p][o][r] && (this.invertedIndex[p][o][r] = Object.create(null));
                for (var g = 0; g < this.metadataWhitelist.length; g++) {
                    var v = this.metadataWhitelist[g],
                        x = p.metadata[v];
                    null == this.invertedIndex[p][o][r][v] && (this.invertedIndex[p][o][r][v] = []), this.invertedIndex[p][o][r][v].push(x)
                }
            }
        }
    }, i.Builder.prototype.calculateAverageFieldLengths = function () {
        for (var e = Object.keys(this.fieldLengths), t = e.length, r = {}, s = {}, n = 0; n < t; n++) {
            var o = i.FieldRef.fromString(e[n]),
                a = o.fieldName;
            s[a] || (s[a] = 0), s[a] += 1, r[a] || (r[a] = 0), r[a] += this.fieldLengths[o]
        }
        var l = Object.keys(this._fields);
        for (n = 0; n < l.length; n++) {
            var u = l[n];
            r[u] = r[u] / s[u]
        }
        this.averageFieldLength = r
    }, i.Builder.prototype.createFieldVectors = function () {
        for (var e = {}, t = Object.keys(this.fieldTermFrequencies), r = t.length, s = Object.create(null), n = 0; n < r; n++) {
            for (var o = i.FieldRef.fromString(t[n]), a = o.fieldName, l = this.fieldLengths[o], u = new i.Vector, c = this.fieldTermFrequencies[o], d = Object.keys(c), h = d.length, f = this._fields[a].boost || 1, p = this._documents[o.docRef].boost || 1, m = 0; m < h; m++) {
                var y, g, v, x = d[m],
                    w = c[x],
                    L = this.invertedIndex[x]._index;
                void 0 === s[x] ? (y = i.idf(this.invertedIndex[x], this.documentCount), s[x] = y) : y = s[x], g = y * ((this._k1 + 1) * w) / (this._k1 * (1 - this._b + this._b * (l / this.averageFieldLength[a])) + w), g *= f, g *= p, v = Math.round(1e3 * g) / 1e3, u.insert(L, v)
            }
            e[o] = u
        }
        this.fieldVectors = e
    }, i.Builder.prototype.createTokenSet = function () {
        this.tokenSet = i.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())
    }, i.Builder.prototype.build = function () {
        return this.calculateAverageFieldLengths(), this.createFieldVectors(), this.createTokenSet(), new i.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
        })
    }, i.Builder.prototype.use = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        t.unshift(this), e.apply(this, t)
    }, i.MatchData = function (e, t, r) {
        for (var i = Object.create(null), s = Object.keys(r || {}), n = 0; n < s.length; n++) {
            var o = s[n];
            i[o] = r[o].slice()
        }
        this.metadata = Object.create(null), void 0 !== e && (this.metadata[e] = Object.create(null), this.metadata[e][t] = i)
    }, i.MatchData.prototype.combine = function (e) {
        for (var t = Object.keys(e.metadata), r = 0; r < t.length; r++) {
            var i = t[r],
                s = Object.keys(e.metadata[i]);
            null == this.metadata[i] && (this.metadata[i] = Object.create(null));
            for (var n = 0; n < s.length; n++) {
                var o = s[n],
                    a = Object.keys(e.metadata[i][o]);
                null == this.metadata[i][o] && (this.metadata[i][o] = Object.create(null));
                for (var l = 0; l < a.length; l++) {
                    var u = a[l];
                    null == this.metadata[i][o][u] ? this.metadata[i][o][u] = e.metadata[i][o][u] : this.metadata[i][o][u] = this.metadata[i][o][u].concat(e.metadata[i][o][u])
                }
            }
        }
    }, i.MatchData.prototype.add = function (e, t, r) {
        if (!(e in this.metadata)) return this.metadata[e] = Object.create(null), void (this.metadata[e][t] = r);
        if (t in this.metadata[e])
            for (var i = Object.keys(r), s = 0; s < i.length; s++) {
                var n = i[s];
                n in this.metadata[e][t] ? this.metadata[e][t][n] = this.metadata[e][t][n].concat(r[n]) : this.metadata[e][t][n] = r[n]
            } else this.metadata[e][t] = r
    }, i.Query = function (e) {
        this.clauses = [], this.allFields = e
    }, i.Query.wildcard = new String("*"), i.Query.wildcard.NONE = 0, i.Query.wildcard.LEADING = 1, i.Query.wildcard.TRAILING = 2, i.Query.presence = {
        OPTIONAL: 1,
        REQUIRED: 2,
        PROHIBITED: 3
    }, i.Query.prototype.clause = function (e) {
        return "fields" in e || (e.fields = this.allFields), "boost" in e || (e.boost = 1), "usePipeline" in e || (e.usePipeline = !0), "wildcard" in e || (e.wildcard = i.Query.wildcard.NONE), e.wildcard & i.Query.wildcard.LEADING && e.term.charAt(0) != i.Query.wildcard && (e.term = "*" + e.term), e.wildcard & i.Query.wildcard.TRAILING && e.term.slice(-1) != i.Query.wildcard && (e.term = e.term + "*"), "presence" in e || (e.presence = i.Query.presence.OPTIONAL), this.clauses.push(e), this
    }, i.Query.prototype.isNegated = function () {
        for (var e = 0; e < this.clauses.length; e++)
            if (this.clauses[e].presence != i.Query.presence.PROHIBITED) return !1;
        return !0
    }, i.Query.prototype.term = function (e, t) {
        if (Array.isArray(e)) return e.forEach(function (e) {
            this.term(e, i.utils.clone(t))
        }, this), this;
        var r = t || {};
        return r.term = e.toString(), this.clause(r), this
    }, i.QueryParseError = function (e, t, r) {
        this.name = "QueryParseError", this.message = e, this.start = t, this.end = r
    }, i.QueryParseError.prototype = new Error, i.QueryLexer = function (e) {
        this.lexemes = [], this.str = e, this.length = e.length, this.pos = 0, this.start = 0, this.escapeCharPositions = []
    }, i.QueryLexer.prototype.run = function () {
        for (var e = i.QueryLexer.lexText; e;) e = e(this)
    }, i.QueryLexer.prototype.sliceString = function () {
        for (var e = [], t = this.start, r = this.pos, i = 0; i < this.escapeCharPositions.length; i++) r = this.escapeCharPositions[i], e.push(this.str.slice(t, r)), t = r + 1;
        return e.push(this.str.slice(t, this.pos)), this.escapeCharPositions.length = 0, e.join("")
    }, i.QueryLexer.prototype.emit = function (e) {
        this.lexemes.push({
            type: e,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
        }), this.start = this.pos
    }, i.QueryLexer.prototype.escapeCharacter = function () {
        this.escapeCharPositions.push(this.pos - 1), this.pos += 1
    }, i.QueryLexer.prototype.next = function () {
        if (this.pos >= this.length) return i.QueryLexer.EOS;
        var e = this.str.charAt(this.pos);
        return this.pos += 1, e
    }, i.QueryLexer.prototype.width = function () {
        return this.pos - this.start
    }, i.QueryLexer.prototype.ignore = function () {
        this.start == this.pos && (this.pos += 1), this.start = this.pos
    }, i.QueryLexer.prototype.backup = function () {
        this.pos -= 1
    }, i.QueryLexer.prototype.acceptDigitRun = function () {
        var e, t;
        do {
            t = (e = this.next()).charCodeAt(0)
        } while (t > 47 && t < 58);
        e != i.QueryLexer.EOS && this.backup()
    }, i.QueryLexer.prototype.more = function () {
        return this.pos < this.length
    }, i.QueryLexer.EOS = "EOS", i.QueryLexer.FIELD = "FIELD", i.QueryLexer.TERM = "TERM", i.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE", i.QueryLexer.BOOST = "BOOST", i.QueryLexer.PRESENCE = "PRESENCE", i.QueryLexer.lexField = function (e) {
        return e.backup(), e.emit(i.QueryLexer.FIELD), e.ignore(), i.QueryLexer.lexText
    }, i.QueryLexer.lexTerm = function (e) {
        if (e.width() > 1 && (e.backup(), e.emit(i.QueryLexer.TERM)), e.ignore(), e.more()) return i.QueryLexer.lexText
    }, i.QueryLexer.lexEditDistance = function (e) {
        return e.ignore(), e.acceptDigitRun(), e.emit(i.QueryLexer.EDIT_DISTANCE), i.QueryLexer.lexText
    }, i.QueryLexer.lexBoost = function (e) {
        return e.ignore(), e.acceptDigitRun(), e.emit(i.QueryLexer.BOOST), i.QueryLexer.lexText
    }, i.QueryLexer.lexEOS = function (e) {
        e.width() > 0 && e.emit(i.QueryLexer.TERM)
    }, i.QueryLexer.termSeparator = i.tokenizer.separator, i.QueryLexer.lexText = function (e) {
        for (; ;) {
            var t = e.next();
            if (t == i.QueryLexer.EOS) return i.QueryLexer.lexEOS;
            if (92 != t.charCodeAt(0)) {
                if (":" == t) return i.QueryLexer.lexField;
                if ("~" == t) return e.backup(), e.width() > 0 && e.emit(i.QueryLexer.TERM), i.QueryLexer.lexEditDistance;
                if ("^" == t) return e.backup(), e.width() > 0 && e.emit(i.QueryLexer.TERM), i.QueryLexer.lexBoost;
                if ("+" == t && 1 === e.width() || "-" == t && 1 === e.width()) return e.emit(i.QueryLexer.PRESENCE), i.QueryLexer.lexText;
                if (t.match(i.QueryLexer.termSeparator)) return i.QueryLexer.lexTerm
            } else e.escapeCharacter()
        }
    }, i.QueryParser = function (e, t) {
        this.lexer = new i.QueryLexer(e), this.query = t, this.currentClause = {}, this.lexemeIdx = 0
    }, i.QueryParser.prototype.parse = function () {
        this.lexer.run(), this.lexemes = this.lexer.lexemes;
        for (var e = i.QueryParser.parseClause; e;) e = e(this);
        return this.query
    }, i.QueryParser.prototype.peekLexeme = function () {
        return this.lexemes[this.lexemeIdx]
    }, i.QueryParser.prototype.consumeLexeme = function () {
        var e = this.peekLexeme();
        return this.lexemeIdx += 1, e
    }, i.QueryParser.prototype.nextClause = function () {
        var e = this.currentClause;
        this.query.clause(e), this.currentClause = {}
    }, i.QueryParser.parseClause = function (e) {
        var t = e.peekLexeme();
        if (null != t) switch (t.type) {
            case i.QueryLexer.PRESENCE:
                return i.QueryParser.parsePresence;
            case i.QueryLexer.FIELD:
                return i.QueryParser.parseField;
            case i.QueryLexer.TERM:
                return i.QueryParser.parseTerm;
            default:
                var r = "expected either a field or a term, found " + t.type;
                throw t.str.length >= 1 && (r += " with value '" + t.str + "'"), new i.QueryParseError(r, t.start, t.end)
        }
    }, i.QueryParser.parsePresence = function (e) {
        var t = e.consumeLexeme();
        if (null != t) {
            switch (t.str) {
                case "-":
                    e.currentClause.presence = i.Query.presence.PROHIBITED;
                    break;
                case "+":
                    e.currentClause.presence = i.Query.presence.REQUIRED;
                    break;
                default:
                    var r = "unrecognised presence operator'" + t.str + "'";
                    throw new i.QueryParseError(r, t.start, t.end)
            }
            var s = e.peekLexeme();
            if (null == s) throw r = "expecting term or field, found nothing", new i.QueryParseError(r, t.start, t.end);
            switch (s.type) {
                case i.QueryLexer.FIELD:
                    return i.QueryParser.parseField;
                case i.QueryLexer.TERM:
                    return i.QueryParser.parseTerm;
                default:
                    throw r = "expecting term or field, found '" + s.type + "'", new i.QueryParseError(r, s.start, s.end)
            }
        }
    }, i.QueryParser.parseField = function (e) {
        var t = e.consumeLexeme();
        if (null != t) {
            if (-1 == e.query.allFields.indexOf(t.str)) {
                var r = e.query.allFields.map(function (e) {
                    return "'" + e + "'"
                }).join(", "),
                    s = "unrecognised field '" + t.str + "', possible fields: " + r;
                throw new i.QueryParseError(s, t.start, t.end)
            }
            e.currentClause.fields = [t.str];
            var n = e.peekLexeme();
            if (null == n) throw s = "expecting term, found nothing", new i.QueryParseError(s, t.start, t.end);
            switch (n.type) {
                case i.QueryLexer.TERM:
                    return i.QueryParser.parseTerm;
                default:
                    throw s = "expecting term, found '" + n.type + "'", new i.QueryParseError(s, n.start, n.end)
            }
        }
    }, i.QueryParser.parseTerm = function (e) {
        var t = e.consumeLexeme();
        if (null != t) {
            e.currentClause.term = t.str.toLowerCase(), -1 != t.str.indexOf("*") && (e.currentClause.usePipeline = !1);
            var r = e.peekLexeme();
            if (null == r) return void e.nextClause();
            switch (r.type) {
                case i.QueryLexer.TERM:
                    return e.nextClause(), i.QueryParser.parseTerm;
                case i.QueryLexer.FIELD:
                    return e.nextClause(), i.QueryParser.parseField;
                case i.QueryLexer.EDIT_DISTANCE:
                    return i.QueryParser.parseEditDistance;
                case i.QueryLexer.BOOST:
                    return i.QueryParser.parseBoost;
                case i.QueryLexer.PRESENCE:
                    return e.nextClause(), i.QueryParser.parsePresence;
                default:
                    var s = "Unexpected lexeme type '" + r.type + "'";
                    throw new i.QueryParseError(s, r.start, r.end)
            }
        }
    }, i.QueryParser.parseEditDistance = function (e) {
        var t = e.consumeLexeme();
        if (null != t) {
            var r = parseInt(t.str, 10);
            if (isNaN(r)) {
                var s = "edit distance must be numeric";
                throw new i.QueryParseError(s, t.start, t.end)
            }
            e.currentClause.editDistance = r;
            var n = e.peekLexeme();
            if (null == n) return void e.nextClause();
            switch (n.type) {
                case i.QueryLexer.TERM:
                    return e.nextClause(), i.QueryParser.parseTerm;
                case i.QueryLexer.FIELD:
                    return e.nextClause(), i.QueryParser.parseField;
                case i.QueryLexer.EDIT_DISTANCE:
                    return i.QueryParser.parseEditDistance;
                case i.QueryLexer.BOOST:
                    return i.QueryParser.parseBoost;
                case i.QueryLexer.PRESENCE:
                    return e.nextClause(), i.QueryParser.parsePresence;
                default:
                    throw s = "Unexpected lexeme type '" + n.type + "'", new i.QueryParseError(s, n.start, n.end)
            }
        }
    }, i.QueryParser.parseBoost = function (e) {
        var t = e.consumeLexeme();
        if (null != t) {
            var r = parseInt(t.str, 10);
            if (isNaN(r)) {
                var s = "boost must be numeric";
                throw new i.QueryParseError(s, t.start, t.end)
            }
            e.currentClause.boost = r;
            var n = e.peekLexeme();
            if (null == n) return void e.nextClause();
            switch (n.type) {
                case i.QueryLexer.TERM:
                    return e.nextClause(), i.QueryParser.parseTerm;
                case i.QueryLexer.FIELD:
                    return e.nextClause(), i.QueryParser.parseField;
                case i.QueryLexer.EDIT_DISTANCE:
                    return i.QueryParser.parseEditDistance;
                case i.QueryLexer.BOOST:
                    return i.QueryParser.parseBoost;
                case i.QueryLexer.PRESENCE:
                    return e.nextClause(), i.QueryParser.parsePresence;
                default:
                    throw s = "Unexpected lexeme type '" + n.type + "'", new i.QueryParseError(s, n.start, n.end)
            }
        }
    }, ((r, i) => {
        "function" == typeof define && define.amd ? define(i) : "object" == typeof e ? t.exports = i() : r.lunr = i()
    })(this, () => i)
}),
    a = [];
class u {
    constructor(e) {
        this.el = e.el
    }
}
const c = (e, t = 100) => {
    let r = Date.now();
    return (...i) => {
        r + t - Date.now() < 0 && (e(...i), r = Date.now())
    }
};
class d {
    constructor() {
        this.listeners = {}, this.scrollTop = 0, this.lastY = 0, this.width = 0, this.height = 0, this.showToolbar = !0, this.toolbar = document.querySelector(".tsd-page-toolbar"), this.secondaryNav = document.querySelector(".tsd-navigation.secondary"), window.addEventListener("scroll", c(() => this.onScroll(), 10)), window.addEventListener("resize", c(() => this.onResize(), 10)), this.onResize(), this.onScroll()
    }
    addEventListener(e, t) {
        e in this.listeners || (this.listeners[e] = []), this.listeners[e].push(t)
    }
    removeEventListener(e, t) {
        if (!(e in this.listeners)) return;
        let r = this.listeners[e];
        for (let e = 0, i = r.length; e < i; e++)
            if (r[e] === t) return void r.splice(e, 1)
    }
    dispatchEvent(e) {
        if (!(e.type in this.listeners)) return !0;
        let t = this.listeners[e.type].slice();
        for (let r = 0, i = t.length; r < i; r++) t[r].call(this, e);
        return !e.defaultPrevented
    }
    triggerResize() {
        let e = new CustomEvent("resize", {
            detail: {
                width: this.width,
                height: this.height
            }
        });
        this.dispatchEvent(e)
    }
    onResize() {
        this.width = window.innerWidth || 0, this.height = window.innerHeight || 0;
        let e = new CustomEvent("resize", {
            detail: {
                width: this.width,
                height: this.height
            }
        });
        this.dispatchEvent(e)
    }
    onScroll() {
        this.scrollTop = window.scrollY || 0;
        let e = new CustomEvent("scroll", {
            detail: {
                scrollTop: this.scrollTop
            }
        });
        this.dispatchEvent(e), this.hideShowToolbar()
    }
    hideShowToolbar() {
        var e;
        let t = this.showToolbar;
        this.showToolbar = this.lastY >= this.scrollTop || this.scrollTop <= 0, t !== this.showToolbar && (this.toolbar.classList.toggle("tsd-page-toolbar--hide"), null == (e = this.secondaryNav) || e.classList.toggle("tsd-navigation--toolbar-hide")), this.lastY = this.scrollTop
    }
}
h = d, h.instance = new d;
var f = (e, t = 100) => {
    let r;
    return (...i) => {
        clearTimeout(r), r = setTimeout(() => e(i), t)
    }
},
    p = ((e, t) => ((e, t, r, i) => {
        if (t && "object" == typeof t || "function" == typeof t)
            for (let r of Object.getOwnPropertyNames(t)) !Object.prototype.hasOwnProperty.call(e, r) && "default" !== r && Object.defineProperty(e, r, {
                get: () => t[r],
                enumerable: !(i = Object.getOwnPropertyDescriptor(t, r)) || i.enumerable
            });
        return e
    })((e => Object.defineProperty(e, "__esModule", {
        value: !0
    }))(Object.defineProperty(null != e ? Object.create(Object.getPrototypeOf(e)) : {}, "default", e && e.__esModule ? {
        get: () => e.default,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e))(o());

function m(e, t) {
    let r = e.querySelector(".current");
    if (r) {
        let e = r;
        if (1 === t)
            do {
                e = e.nextElementSibling
            } while (e instanceof HTMLElement && null == e.offsetParent);
        else
            do {
                e = e.previousElementSibling
            } while (e instanceof HTMLElement && null == e.offsetParent);
        e && (r.classList.remove("current"), e.classList.add("current"))
    } else (r = e.querySelector(1 == t ? "li:first-child" : "li:last-child")) && r.classList.add("current")
}

function v(e) {
    return e.replace(/[&<>"'"]/g, e => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;"
    })[e])
}
class x {
    constructor(e, t) {
        this.signature = e, this.description = t
    }
    addClass(e) {
        return this.signature.classList.add(e), this.description.classList.add(e), this
    }
    removeClass(e) {
        return this.signature.classList.remove(e), this.description.classList.remove(e), this
    }
}
let w = "mousedown",
    L = "mousemove",
    E = "mouseup",
    b = {
        x: 0,
        y: 0
    },
    S = !1,
    k = !1,
    Q = !1,
    T = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
document.documentElement.classList.add(T ? "is-mobile" : "not-mobile"), T && "ontouchstart" in document.documentElement && (E = "touchend", L = "touchmove", w = "touchstart"), document.addEventListener(w, e => {
    k = !0, Q = !1;
    let t = "touchstart" == w ? e.targetTouches[0] : e;
    b.y = t.pageY || 0, b.x = t.pageX || 0
}), document.addEventListener(L, e => {
    if (k && !Q) {
        let t = "touchstart" == w ? e.targetTouches[0] : e,
            r = b.x - (t.pageX || 0),
            i = b.y - (t.pageY || 0);
        Q = Math.sqrt(r * r + i * i) > 10
    }
}), document.addEventListener(E, () => k = !1), document.addEventListener("click", e => {
    S && (e.preventDefault(), e.stopImmediatePropagation(), S = !1)
});
class P {
    constructor(e, t) {
        this.key = e, this.value = t, this.defaultValue = t, this.initialize(), window.localStorage[this.key] && this.setValue(this.fromLocalStorage(window.localStorage[this.key]))
    }
    initialize() { }
    setValue(e) {
        if (this.value == e) return;
        let t = this.value;
        this.value = e, window.localStorage[this.key] = this.toLocalStorage(e), this.handleValueChange(t, e)
    }
}
class O extends P {
    initialize() {
        let e = document.querySelector("#tsd-filter-" + this.key);
        !e || (this.checkbox = e, this.checkbox.addEventListener("change", () => {
            this.setValue(this.checkbox.checked)
        }))
    }
    handleValueChange(e, t) {
        !this.checkbox || (this.checkbox.checked = this.value, document.documentElement.classList.toggle("toggle-" + this.key, this.value != this.defaultValue))
    }
    fromLocalStorage(e) {
        return "true" == e
    }
    toLocalStorage(e) {
        return e ? "true" : "false"
    }
}
class I extends P {
    initialize() {
        document.documentElement.classList.add("toggle-" + this.key + this.value);
        let e = document.querySelector("#tsd-filter-" + this.key);
        if (!e) return;
        this.select = e;
        let t = () => {
            this.select.classList.add("active")
        };
        this.select.addEventListener(w, t), this.select.addEventListener("mouseover", t), this.select.addEventListener("mouseleave", () => {
            this.select.classList.remove("active")
        }), this.select.querySelectorAll("li").forEach(t => {
            t.addEventListener(E, t => {
                e.classList.remove("active"), this.setValue(t.target.dataset.value || "")
            })
        }), document.addEventListener(w, e => {
            this.select.contains(e.target) || this.select.classList.remove("active")
        })
    }
    handleValueChange(e, t) {
        this.select.querySelectorAll("li.selected").forEach(e => {
            e.classList.remove("selected")
        });
        let r = this.select.querySelector('li[data-value="' + t + '"]'),
            i = this.select.querySelector(".tsd-select-label");
        r && i && (r.classList.add("selected"), i.textContent = r.textContent), document.documentElement.classList.remove("toggle-" + e), document.documentElement.classList.add("toggle-" + t)
    }
    fromLocalStorage(e) {
        return e
    }
    toLocalStorage(e) {
        return e
    }
}
class R extends u {
    constructor(e) {
        super(e), this.optionInherited = new O("inherited", !0), this.optionExternals = new O("externals", !0), this.optionVisibility = new I("visibility", "private")
    }
    static isSupported() {
        try {
            return void 0 !== window.localStorage
        } catch {
            return !1
        }
    }
} (() => {
    let e = document.getElementById("tsd-search");
    if (!e) return;
    let t = document.getElementById("search-script");
    e.classList.add("loading"), t && (t.addEventListener("error", () => {
        e.classList.remove("loading"), e.classList.add("failure")
    }), t.addEventListener("load", () => {
        e.classList.remove("loading"), e.classList.add("ready")
    }), window.searchData && e.classList.remove("loading"));
    let r = document.querySelector("#tsd-search input"),
        i = document.querySelector("#tsd-search .results");
    if (!r || !i) throw new Error("The input field or the result list wrapper was not found");
    let s = !1;
    i.addEventListener("mousedown", () => s = !0), i.addEventListener("mouseup", () => {
        s = !1, e.classList.remove("has-focus")
    }), r.addEventListener("focus", () => e.classList.add("has-focus")), r.addEventListener("blur", () => {
        s || (s = !1, e.classList.remove("has-focus"))
    });
    let n = {
        base: e.dataset.base + "/"
    };
    const o = (e, t) => {
        if ("" === t) return e;
        let r = e.toLocaleLowerCase(),
            i = t.toLocaleLowerCase(),
            s = [],
            n = 0,
            o = r.indexOf(i);
        for (; - 1 != o;) s.push(v(e.substring(n, o)), `<b>${v(e.substring(o, o + i.length))}</b>`), n = o + i.length, o = r.indexOf(i, n);
        return s.push(v(e.substring(n))), s.join("")
    };
    ((e, t, r, i) => {
        r.addEventListener("input", f(() => {
            ((e, t, r, i) => {
                if (function (e, t) {
                    e.index || window.searchData && (t.classList.remove("loading"), t.classList.add("ready"), e.data = window.searchData, e.index = p.Index.load(window.searchData.index))
                }(i, e), !i.index || !i.data) return;
                t.textContent = "";
                let s = r.value.trim(),
                    n = i.index.search(`*${s}*`);
                for (let e = 0, r = Math.min(10, n.length); e < r; e++) {
                    let r = i.data.rows[Number(n[e].ref)],
                        a = o(r.name, s);
                    r.parent && (a = `<span class="parent">${o(r.parent, s)}.</span>${a}`);
                    let l = document.createElement("li");
                    l.classList.value = r.classes;
                    let u = document.createElement("a");
                    u.href = i.base + r.url, u.classList.add("tsd-kind-icon"), u.innerHTML = a, l.append(u), t.appendChild(l)
                }
            })(e, t, r, i)
        }, 200));
        let s = !1;
        r.addEventListener("keydown", e => {
            s = !0, "Enter" == e.key ? function (e, t) {
                let r = e.querySelector(".current");
                if (r || (r = e.querySelector("li:first-child")), r) {
                    let e = r.querySelector("a");
                    e && (window.location.href = e.href), t.blur()
                }
            }(t, r) : "Escape" == e.key ? r.blur() : "ArrowUp" == e.key ? m(t, -1) : "ArrowDown" === e.key ? m(t, 1) : s = !1
        }), r.addEventListener("keypress", e => {
            s && e.preventDefault()
        }), document.body.addEventListener("keydown", e => {
            e.altKey || e.ctrlKey || e.metaKey || !r.matches(":focus") && "/" === e.key && (r.focus(), e.preventDefault())
        })
    })(e, i, r, n)
})(), a.push({
    selector: ".menu-highlight",
    constructor: class extends u {
        constructor(e) {
            super(e), this.anchors = [], this.index = -1, h.instance.addEventListener("resize", () => this.onResize()), h.instance.addEventListener("scroll", e => this.onScroll(e)), this.createAnchors()
        }
        createAnchors() {
            let e = window.location.href; - 1 != e.indexOf("#") && (e = e.substr(0, e.indexOf("#"))), this.el.querySelectorAll("a").forEach(t => {
                let r = t.href;
                if (-1 == r.indexOf("#") || r.substr(0, e.length) != e) return;
                let i = r.substr(r.indexOf("#") + 1),
                    s = document.querySelector("a.tsd-anchor[name=" + i + "]"),
                    n = t.parentNode;
                !s || !n || this.anchors.push({
                    link: n,
                    anchor: s,
                    position: 0
                })
            }), this.onResize()
        }
        onResize() {
            let e;
            for (let t = 0, r = this.anchors.length; t < r; t++) {
                let r = (e = this.anchors[t]).anchor.getBoundingClientRect();
                e.position = r.top + document.body.scrollTop
            }
            this.anchors.sort((e, t) => e.position - t.position);
            let t = new CustomEvent("scroll", {
                detail: {
                    scrollTop: h.instance.scrollTop
                }
            });
            this.onScroll(t)
        }
        onScroll(e) {
            let t = e.detail.scrollTop + 5,
                r = this.anchors,
                i = r.length - 1,
                s = this.index;
            for (; s > -1 && r[s].position > t;) s -= 1;
            for (; s < i && r[s + 1].position < t;) s += 1;
            this.index != s && (this.index > -1 && this.anchors[this.index].link.classList.remove("focus"), this.index = s, this.index > -1 && this.anchors[this.index].link.classList.add("focus"))
        }
    }
}, {
    selector: ".tsd-signatures",
    constructor: class extends u {
        constructor(e) {
            super(e), this.groups = [], this.index = -1, this.createGroups(), this.container && (this.el.classList.add("active"), Array.from(this.el.children).forEach(e => {
                e.addEventListener("touchstart", e => this.onClick(e)), e.addEventListener("click", e => this.onClick(e))
            }), this.container.classList.add("active"), this.setIndex(0))
        }
        setIndex(e) {
            if (e < 0 && (e = 0), e > this.groups.length - 1 && (e = this.groups.length - 1), this.index == e) return;
            let t = this.groups[e];
            if (this.index > -1) {
                let e = this.groups[this.index];
                e.removeClass("current").addClass("fade-out"), t.addClass("current"), t.addClass("fade-in"), h.instance.triggerResize(), setTimeout(() => {
                    e.removeClass("fade-out"), t.removeClass("fade-in")
                }, 300)
            } else t.addClass("current"), h.instance.triggerResize();
            this.index = e
        }
        createGroups() {
            let e = this.el.children;
            if (e.length < 2) return;
            this.container = this.el.nextElementSibling;
            let t = this.container.children;
            this.groups = [];
            for (let r = 0; r < e.length; r++) this.groups.push(new x(e[r], t[r]))
        }
        onClick(e) {
            this.groups.forEach((t, r) => {
                t.signature === e.currentTarget && this.setIndex(r)
            })
        }
    }
}, {
    selector: "a[data-toggle]",
    constructor: class extends u {
        constructor(e) {
            super(e), this.className = this.el.dataset.toggle || "", this.el.addEventListener(E, e => this.onPointerUp(e)), this.el.addEventListener("click", e => e.preventDefault()), document.addEventListener(w, e => this.onDocumentPointerDown(e)), document.addEventListener(E, e => this.onDocumentPointerUp(e))
        }
        setActive(e) {
            if (this.active == e) return;
            this.active = e, document.documentElement.classList.toggle("has-" + this.className, e), this.el.classList.toggle("active", e);
            let t = (this.active ? "to-has-" : "from-has-") + this.className;
            document.documentElement.classList.add(t), setTimeout(() => document.documentElement.classList.remove(t), 500)
        }
        onPointerUp(e) {
            Q || (this.setActive(!0), e.preventDefault())
        }
        onDocumentPointerDown(e) {
            if (this.active) {
                if (e.target.closest(".col-menu, .tsd-filter-group")) return;
                this.setActive(!1)
            }
        }
        onDocumentPointerUp(e) {
            if (!Q && this.active && e.target.closest(".col-menu")) {
                let t = e.target.closest("a");
                if (t) {
                    let e = window.location.href; - 1 != e.indexOf("#") && (e = e.substr(0, e.indexOf("#"))), t.href.substr(0, e.length) == e && setTimeout(() => this.setActive(!1), 250)
                }
            }
        }
    }
}), R.isSupported() ? a.push({
    constructor: R,
    selector: "#tsd-filter"
}) : document.documentElement.classList.add("no-filter");
const F = document.getElementById("theme");

function C(e) {
    switch (e) {
        case "os":
            document.body.classList.remove("light", "dark"), document.body.classList.add("dark");
            break;
        case "light":
            document.body.classList.remove("dark"), document.body.classList.add("light");
            break;
        case "dark":
            document.body.classList.remove("light"), document.body.classList.add("dark")
    }
}
if (F) {
    let e = localStorage.getItem("tsd-theme") || "os";
    F.value = e, C(e), F.onchange = (() => {
        localStorage.setItem("tsd-theme", F.value), C(F.value)
    })
}
a.forEach(e => {
    document.body.querySelectorAll(e.selector).forEach(t => {
        t.dataset.hasInstance || (new e.constructor({
            el: t
        }), t.dataset.hasInstance = String(!0))
    })
})