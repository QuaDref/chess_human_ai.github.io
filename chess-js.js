var j = !0,
	k = !1;
AI = {
	oa: 3,
	H: [{
		position: [".,.,.,.,.,.,.,.".split(","), ".,b,.,b,b,.,b,.".split(","), ".,.,n,.,.,n,.,.".split(","), ".,.,b,.,.,b,B,.".split(","), ".,.,B,.,.,B,b,.".split(","), ".,P,N,.,.,N,P,.".split(","), ".,B,.,B,B,.,B,.".split(","), ".,.,.,.,.,.,.,.".split(",")],
		ma: 0.15
	}, {
		position: [".,.,.,R,R,.,.,.".split(","), ".,.,.,R,R,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,P,P,.,.,.".split(","), ".,.,.,P,P,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,R,R,.,.,.".split(","), ".,.,.,R,R,.,.,.".split(",")],
		ma: 0.5,
		gb: j
	}, {
		position: [".,.,k,.,.,r,k,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,K,.,.,R,K,.".split(",")],
		ma: 0.4
	}],
	Ha: j,
	ua: [],
	fb: {
		K: 100,
		k: -100,
		Q: 9,
		q: -9,
		B: 3,
		b: -3,
		N: 3,
		n: -3,
		R: 5,
		r: -5,
		P: 1,
		p: -1,
		".": 0
	},
	Ea: {
		1: 4,
		2: 2,
		3: 0.5
	},
	evaluate: function(a) {
		for (var b = a.position, c = 0, d = 0; 8 > d; d++)
			for (var e = 0; 8 > e; e++) {
				var f = b[d][e],
					g = f.toUpperCase(),
					c = c + AI.fb[f] * a.c;
				if (!l(f))
					for (var h =
							m(f) * a.c, i = 0; i < AI.H.length; i++)
						if (AI.H[i].gb && AI.H[i].position[d][e] == g || f == AI.H[i].position[d][e]) c += AI.H[i].ma * h
			}
		d = Analyzer.X(a);
		"opening" == d && ("q" != b[0][3] && (c += 0.4 * a.c), "Q" != b[7][3] && (c -= 0.4 * a.c));
		if ("ending" != d) return c;
		for (d = 0; 4 > d; d++)
			for (e = 0; 8 > e; e++) f = b[d][e], "P" == f && (c += AI.Ea[d] * m(f) * a.c);
		for (d = 4; 8 > d; d++)
			for (e = 0; 8 > e; e++) f = b[d][e], "p" == f && (c += AI.Ea[7 - d] * m(f) * a.c);
		return c
	},
	Ka: function(a) {
		AI.Ga = 0;
		return {
			val: AI.ea(a, AI.oa),
			move: AI.ua
		}
	},
	ea: function(a, b, c) {
		AI.Ga++;
		if (0 == b) {
			b = AI.evaluate(a);
			if ("kill" ==
				c.g) {
				var d = Analyzer.Ba(a, c.move[0].o, c.move[0].f, -m(c.move[0].d), n);
				if (d.result) {
					c = a.T();
					a.M(d);
					var e = -AI.ea(a, 0, d);
					a.aa(d, c);
					return Math.max(e, b)
				}
			}
			return b
		}
		d = Analyzer.ha(a);
		if (0 == d.length) return Analyzer.t(a, a.c) ? -1E3 : 0;
		for (var e = -1E4, f = 0; f < d.length; f++) {
			c = a.T();
			a.M(d[f]);
			var g = -AI.ea(a, b - 1, d[f]);
			a.aa(d[f], c);
			if (g > e || AI.Ha && g == e && 0.5 < Math.random()) e = g, b == AI.oa && (AI.ua = d[f])
		}
		return e
	},
	Ra: function(a, b) {
		if (0 == b) return AI.evaluate(a);
		var c = Analyzer.Va(a);
		if (0 == c.length) return AI.evaluate(a);
		for (var d = -1E4, e = 0; e < c.length; e++) {
			var f = a.T();
			a.M(c[e]);
			var d = Math.max(d, -AI.evaluate(a)),
				g = -AI.Ra(a, b - 1);
			a.aa(c[e], f);
			g > d && (d = g)
		}
		return d
	}
};
Analyzer = {
	ra: [-2, -1, 1, 2, 2, 1, -1, -2],
	U: [-1, -2, -2, -1, 1, 2, 2, 1],
	La: [-1, 1, 1, -1],
	na: [-1, -1, 1, 1],
	Qa: [0, -1, 0, 1],
	sa: [1, 0, -1, 0],
	Pa: [0, 0, 1, -1, 0, 0, 1, -1],
	da: [-1, -2, -1, -1, 1, 2, 1, 1],
	qa: [-1, 0, 1, 1, 1, 0, -1, -1],
	ca: [-1, -1, -1, 0, 1, 1, 1, 0],
	X: function(a) {
		for (var a = a.position, b = 0, c = 0, d = 0; 8 > d; d++)
			for (var e = 0; 8 > e; e++) a[d][e] == INITIAL_GAME_STATE.position[d][e] && b++, l(a[d][e]) || c++;
		return 24 <= c && 18 <= b ? "opening" : 24 <= c && 18 > b || 16 < c ? "middle" : "ending"
	},
	t: function(a, b) {
		var c = Analyzer.Ua(a, b);
		return Analyzer.L(a, c.x, c.y, -b).result
	},
	Ua: function(a,
		b) {
		for (var c = 0; 8 > c; c++)
			for (var d = 0; 8 > d; d++)
				if ("K" == a.position[c][d] && 1 == b || "k" == a.position[c][d] && -1 == b) return {
					x: d,
					y: c
				};
		throw "No king on the board";
	},
	L: function(a, b, c, d) {
		return Analyzer.Ba(a, b, c, d, o)
	},
	Ba: function(a, b, c, d, e) {
		for (var f = a.position, g = 0; g < Analyzer.ca.length; g++)
			for (var h = 1; 7 >= h; h++) {
				var i = b + Analyzer.qa[g] * h,
					u = c + Analyzer.ca[g] * h;
				if (!p(i, u)) break;
				var E = f[u][i];
				if (!l(E)) {
					if (1 == d) {
						if (q(E) && (i = e(a, i, u, b, c), i.result)) return i
					} else if (r(E) && (i = e(a, i, u, b, c), i.result)) return i;
					break
				}
			}
		for (g = 0; g <
			Analyzer.U.length; g++)
			if (i = b + Analyzer.ra[g], u = c + Analyzer.U[g], p(i, u) && (h = f[u][i], !l(h)))
				if (1 == d) {
					if ("N" == h && (i = e(a, i, u, b, c), i.result)) return i
				} else if ("n" == h && (i = e(a, i, u, b, c), i.result)) return i;
		return s
	},
	ha: function(a) {
		for (var b = [], c = 0; 8 > c; c++)
			for (var d = 0; 8 > d; d++) switch (a.position[c][d]) {
				case "K":
				case "k":
					b = b.concat(Analyzer.Wa(a, d, c));
					break;
				case "Q":
				case "q":
					b = b.concat(Analyzer.Za(a, d, c));
					break;
				case "B":
				case "b":
					b = b.concat(Analyzer.xa(a, d, c));
					break;
				case "N":
				case "n":
					b = b.concat(Analyzer.Xa(a, d, c));
					break;
				case "R":
				case "r":
					b = b.concat(Analyzer.ya(a, d, c));
					break;
				case "P":
				case "p":
					b = b.concat(Analyzer.Ya(a, d, c))
			}
		return b
	},
	Va: function(a) {
		for (var a = Analyzer.ha(a), b = [], c = 0; c < a.length; c++) "kill" == a[c].g && b.push(a[c]);
		return b
	},
	Wa: function(a, b, c) {
		for (var d = [], e = 0; e < Analyzer.da.length; e++) {
			var f = b + Analyzer.qa[e],
				g = c + Analyzer.ca[e];
			p(f, g) && (f = n(a, b, c, f, g), f.result && d.push(f))
		}
		p(b + 2, c) && (f = n(a, b, c, b + 2, c), f.result && d.push(f));
		p(b - 2, c) && (f = n(a, b, c, b - 2, c), f.result && d.push(f));
		return d
	},
	Ya: function(a, b, c) {
		for (var d = [], e = 0; e < Analyzer.da.length; e++) {
			var f = b + Analyzer.Pa[e],
				g = c + Analyzer.da[e];
			p(f, g) && (f = n(a, b, c, f, g), f.result && d.push(f))
		}
		return d
	},
	Xa: function(a, b, c) {
		for (var d = [], e = 0; e < Analyzer.U.length; e++) {
			var f = b + Analyzer.ra[e],
				g = c + Analyzer.U[e];
			p(f, g) && (f = n(a, b, c, f, g), f.result && d.push(f))
		}
		return d
	},
	xa: function(a, b, c) {
		for (var d = [], e = 0; e < Analyzer.na.length; e++)
			for (var f = 1; 7 >= f; f++) {
				var g = b + Analyzer.La[e] * f,
					h = c + Analyzer.na[e] * f;
				if (!p(g, h)) break;
				g = n(a, b, c, g, h);
				if (g.result) d.push(g);
				else if ("check" != g.g) break
			}
		return d
	},
	ya: function(a, b, c) {
		for (var d = [], e = 0; e < Analyzer.sa.length; e++)
			for (var f = 1; 7 >= f; f++) {
				var g = b + Analyzer.Qa[e] * f,
					h = c + Analyzer.sa[e] * f;
				if (!p(g, h)) break;
				g = n(a, b, c, g, h);
				if (g.result) d.push(g);
				else if ("check" != g.g) break
			}
		return d
	},
	Za: function(a, b, c) {
		var d = Analyzer.ya(a, b, c);
		return d = d.concat(Analyzer.xa(a, b, c))
	}
};
var t;

function v() {
	var a = jQuery("body").width(),
		b = jQuery("body").height(),
		a = 0.9 * Math.min(a, b),
		b = jQuery("#screen");
	b.width(a);
	b.height(a);
	var c = document.getElementById("screen");
	c.width = a;
	c.height = a;
	b.css("marginTop", (jQuery(document).height() - a) / 2);
	b.css("marginLeft", (jQuery(document).width() - a) / 2)
}
jQuery(document).ready(function() {
	v();
	jQuery(window).resize(function() {
		v();
		UI.Aa(document.getElementById("screen"));
		UI.W()
	});
	var a = document.getElementById("screen");
	UI.Aa(a);
	a.onclick = UI.cb;
	UI.O.onload = function() {
		UI.la = UI.O.width / 6;
		UI.ka = UI.O.height / 2;
		UI.W()
	};
	w(INITIAL_GAME_STATE, new x, new y)
});

function w(a, b, c) {
	a = jQuery.extend(j, {}, a);
	t = new z(a, b, c);
	UI.va.za = function(a, b) {
		return t.a.position[a][b]
	};
	UI.delegate.fa = function(a, b) {
		return l(t.a.position[a][b]) ? k : m(t.a.position[a][b]) == t.a.c
	};
	t.Fa = function(a) {
		UI.ba(a)
	};
	t.Ca = function() {
		alert("Mate!")
	};
	t.S = function(a) {
		jQuery("#status").text(a)
	};
	t.ib = function(a) {
		t.ia(a)
	};
	t.ia = function(a) {
		a ? (jQuery("#mmove").text(a.Da()), jQuery("#status").text(a.g), jQuery("#eval").text(Math.round(100 * AI.evaluate(t.a) * t.a.c) / 100), jQuery("#gper").text(Analyzer.X(t.a)),
			jQuery("#peval").text(AI.Ga)) : (jQuery("#mmove").text(""), jQuery("#status").text(""), jQuery("#eval").text(Math.round(100 * AI.evaluate(t.a) * t.a.c) / 100), jQuery("#gper").text(Analyzer.X(t.a)), jQuery("#peval").text(0));
		jQuery("#curmove").text(t.a.c == A ? "White" : "Black")
	};
	jQuery("#curmove").text(t.a.c == A ? "White" : "Black");
	jQuery("#gper").text(Analyzer.X(t.a));
	jQuery("#eval").text(Math.round(100 * AI.evaluate(t.a) * t.a.c) / 100);
	jQuery("#status").text("Game started!");
	UI.W()
}

function z(a, b, c) {
	function d(a) {
		for (var b = [], c = 0; c < a.h.length; c++) b.push({
			u: a.h[c].y,
			s: a.h[c].x
		});
		for (c = 0; c < a.move.length; c++) b.push({
			u: a.move[c].G,
			s: a.move[c].J
		}), b.push({
			u: a.move[c].f,
			s: a.move[c].o
		});
		return b
	}

	function e(a) {
		f.log.push(a);
		f.bb.push(f.a.T());
		f.a.M(a);
		f.Fa(d(a));
		var b = f.a.ab();
		b ? f.Ca(f.a.c) : Analyzer.t(f.a, f.a.c) && f.Sa();
		f.V = (f.V + 1) % 2;
		b || setTimeout(function() {
			f.z[f.V].$(f.a)
		}, 0);
		f.ia(a)
	}
	this.Fa = function() {
		console.error("Game.positionChanged is not assigned")
	};
	this.ia = function() {
		console.warn("Game.movePerformed is not assigned")
	};
	this.Ca = function() {
		console.warn("Game.mateHappened is not assigned")
	};
	this.Sa = function() {
		console.warn("Game.checkHappened is not assigned")
	};
	this.S = function() {
		console.warn("Game.reportError is not assigned")
	};
	var f = this;
	this.Z = function(b, c) {
		this.z = [b, c];
		for (var d = 0; d < this.z.length; d++) this.z[d].ja = e, this.z[d].S = function(a) {
			f.S(a)
		};
		setTimeout(function() {
			f.z[f.V].$(a)
		}, 0)
	};
	this.log = [];
	this.bb = [];
	this.Z(b, c);
	this.V = a.c == A ? 0 : 1;
	this.a = a
}
var A = 1,
	B = -1;

function C(a, b) {
	return new D(a, b, j, j, j, j)
}

function D(a, b, c, d, e, f) {
	this.position = a;
	this.C = c;
	this.w = d;
	this.A = e;
	this.v = f;
	this.c = b;
	this.m = null;
	this.M = function(a) {
		this.m = a;
		for (var b = 0; b < a.h.length; b++) this.position[a.h[b].y][a.h[b].x] = ".";
		for (b = 0; b < a.move.length; b++) {
			var c = a.move[b].J,
				d = a.move[b].G,
				e = this.position,
				f = c,
				J = d;
			e[a.move[b].f][a.move[b].o] = e[J][f];
			e[J][f] = ".";
			0 == d && 4 == c ? this.w = this.v = k : 0 == d && 0 == c ? this.v = k : 0 == d && 7 == c ? this.w = k : 7 == d && 4 == c ? this.C = this.A = k : 7 == d && 0 == c ? this.A = k : 7 == d && 7 == c && (this.C = k)
		}
		"transform" == a.g && (this.position[a.move[0].f][a.move[0].o] =
			"p" == a.move[0].d ? "q" : "Q");
		this.c = -this.c
	};
	this.aa = function(a, b) {
		this.m = b.m;
		"transform" == a.g && (this.position[a.move[0].f][a.move[0].o] = "p" == a.move[0].d ? "p" : "P");
		this.v = b.v;
		this.A = b.A;
		this.w = b.w;
		this.C = b.C;
		for (var c = 0; c < a.move.length; c++) {
			var d = this.position,
				e = a.move[c].o,
				f = a.move[c].f;
			d[a.move[c].G][a.move[c].J] = d[f][e];
			d[f][e] = "."
		}
		for (c = 0; c < a.h.length; c++) this.position[a.h[c].y][a.h[c].x] = a.h[c].d;
		this.c = -this.c
	};
	this.T = function() {
		return {
			w: this.w,
			C: this.C,
			v: this.v,
			A: this.A,
			m: this.m
		}
	};
	this.ab = function() {
		return Analyzer.t(this,
			this.c) && 0 == Analyzer.ha(this).length
	}
}
INITIAL_GAME_STATE = new C(["r,n,b,q,k,b,n,r".split(","), "p,p,p,p,p,p,p,p".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), "P,P,P,P,P,P,P,P".split(","), "R,N,B,Q,K,B,N,R".split(",")], A);
ENDING_GAME_STATE = new C([".,.,.,.,k,.,.,.".split(","), "p,p,p,p,p,p,p,p".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), "P,P,P,P,P,P,P,P".split(","), ".,.,.,.,K,.,.,.".split(",")], A);
ENDING_2_GAME_STATE = new C([".,r,.,.,k,.,.,.".split(","), ".,.,.,.,.,p,p,.".split(","), ".,.,.,.,p,.,.,p".split(","), ".,.,.,p,P,.,.,.".split(","), "p,.,.,P,.,.,.,.".split(","), ".,.,.,P,K,.,.,P".split(","), ".,.,.,.,.,P,P,.".split(","), ".,.,.,R,.,.,.,.".split(",")], A);
BIND_WITH_KING_TEST = new C(["r,.,b,q,k,.,n,r".split(","), "p,p,p,p,.,p,p,p".split(","), ".,.,n,.,.,.,.,.".split(","), ".,.,.,.,p,.,.,.".split(","), ".,b,.,.,P,.,.,.".split(","), ".,.,N,P,.,.,.,.".split(","), "P,P,P,.,.,P,P,P".split(","), "R,.,B,Q,K,B,N,R".split(",")], A);
EN_PASSANT_TEST = new C(["r,n,b,q,k,b,n,r".split(","), ".,p,p,p,p,p,p,p".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,P,.,.,.".split(","), "p,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), "P,P,P,P,.,P,P,P".split(","), "R,N,B,Q,K,B,N,R".split(",")], B);
CASTLING_TEST_GAME_STATE = new C(["r,.,.,.,k,.,.,r".split(","), "p,p,p,q,.,p,p,p".split(","), ".,.,n,p,.,n,.,.".split(","), ".,.,b,.,p,.,B,.".split(","), ".,.,B,.,P,.,b,.".split(","), ".,.,N,P,.,N,.,.".split(","), "P,P,P,Q,.,P,P,P".split(","), "R,.,.,.,K,.,.,R".split(",")], A);
SMALL_POSITION_GAME_STATE = new C([".,.,.,.,.,.,.,.".split(","), ".,.,k,.,N,.,.,.".split(","), ".,r,.,.,.,.,.,.".split(","), ".,.,.,.,Q,.,.,p".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,K,.,.,.,.".split(","), ".,.,.,.,.,B,.,.".split(","), ".,.,.,.,.,.,.,.".split(",")], A);
BLACK_CHECKMATE = new C([".,.,.,R,.,b,k,r".split(","), "p,.,.,R,.,.,p,.".split(","), ".,.,.,B,p,p,.,p".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,p,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), "r,.,P,.,.,P,P,P".split(","), ".,.,.,.,.,.,K,.".split(",")], B);
RIDICULOUS_MOVE = new C(["r,n,b,q,k,b,n,r".split(","), ".,p,.,p,.,.,.,.".split(","), ".,.,.,.,.,p,.,.".split(","), "p,.,p,.,p,.,p,Q".split(","), "P,.,.,.,.,.,.,.".split(","), ".,P,.,.,P,.,.,.".split(","), ".,B,P,P,.,P,P,P".split(","), "R,N,.,.,K,B,N,R".split(",")], B);
COOL_PAWN = new C([".,.,.,.,.,.,.,.".split(","), "P,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,K,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,p,k,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(",")], B);
WEIRD_CHECK_STACK = new D([".,.,Q,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,k,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), "K,.,.,.,.,.,.,.".split(","), ".,P,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(",")], B, k, k, k, k);
SUPER_SIMPLE_GAME_STATE = new D([".,.,.,.,k,.,.,.".split(","), ".,.,.,p,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,.,.,.,.".split(","), ".,.,.,.,P,.,.,.".split(","), ".,.,.,.,K,.,.,.".split(",")], A, k, k, k, k);
PREDEFINED_GAME_STATES = [{
	name: "Initial game state",
	e: INITIAL_GAME_STATE
}];

function F() {
	this.$ = function() {
		throw "player.thinkAboutPosition is not assigned";
	};
	this.ja = function() {
		throw "player.movementReady is not assigned";
	};
	this.S = function() {
		console.error("player.reportError is not assigned")
	}
}
x.prototype = new F;

function x() {
	var a = this;
	this.$ = function(b) {
		jQuery("#think1").fadeOut("slow");
		UI.delegate.ga = function(c, d, e, f) {
			l(b.position[d][c]) ? UI.Ia(e, f) : (c = n(b, c, d, e, f), c.result ? (UI.delegate.ga = null, a.ja(c)) : (UI.Ia(e, f), a.S(c.g)))
		}
	}
}
y.prototype = new F;

function y() {
	var a = this;
	this.$ = function(b) {
		jQuery("#think1").fadeIn("fast", function() {
			var c = AI.Ka(b);
			a.ja(c.move)
		})
	}
}

function G(a, b, c, d) {
	return new H(a, b, c, d)
}
var I = {
	"0": "a",
	1: "b",
	2: "c",
	3: "d",
	4: "e",
	5: "f",
	6: "g",
	7: "h"
};

function K(a, b, c, d, e) {
	return {
		J: a,
		G: b,
		o: c,
		f: d,
		d: e
	}
}

function H(a, b, c, d) {
	this.result = a;
	this.g = b;
	this.h = c;
	this.move = d;
	this.Da = function() {
		if (!this.result) throw "Notation is not determined for incorrect move";
		if ("castling" == this.g) return 0 == this.move[1].J ? "0-0-0" : "0-0";
		var a = "";
		"P" != this.move[0].d && "p" != this.move[0].d && (a = this.move[0].d.toUpperCase());
		return a += I[this.move[0].J] + (7 - this.move[0].G + 1) + "-" + I[this.move[0].o] + (7 - this.move[0].f + 1)
	};
	return this
}
var s = G(k, "bad move", [], []);

function L(a) {
	return G(k, a, [], [])
}

function n(a, b, c, d, e) {
	var f = a.position[c][b],
		g = a.position[e][d];
	if (m(f) !== a.c) return L("Not your turn, man");
	if (!l(g) && m(f) == m(g)) return L("Same color");
	b = o(a, b, c, d, e);
	if (!b.result) return b;
	c = a.T();
	a.M(b);
	d = b;
	Analyzer.t(a, -a.c) && (d = G(k, "check", [], []));
	a.aa(b, c);
	return d
}

function o(a, b, c, d, e) {
	var f = a.position[c][b],
		g = a.position[e][d];
	if ("p" == f || "P" == f) {
		a = M(a, b, c, d, e, f, g);
		if (a.result && (0 == e || 7 == e)) a.g = "transform";
		e = a
	} else if ("b" == f || "B" == f) e = N(a, b, c, d, e, f, g);
	else if ("n" == f || "N" == f) e = 2 == Math.abs(b - d) && 1 == Math.abs(c - e) || 1 == Math.abs(b - d) && 2 == Math.abs(c - e) ? O(b, c, d, e, f, g) : s;
	else if ("r" == f || "R" == f) e = P(a, b, c, d, e, f, g);
	else if ("q" == f || "Q" == f) var h = P(a, b, c, d, e, f, g),
		e = N(a, b, c, d, e, f, g),
		e = h.result ? h : e.result ? e : s;
	else "k" == f || "K" == f ? (h = a.position, e = 1 < Math.abs(b - d) ? c != e || !l(g) ? s :
			4 == b && 6 == d && c == e && 0 == c && a.w && Q(h, b, c, 7, 0) ? Analyzer.t(a, m(f)) ? L("impossible to castle under check") : Analyzer.L(a, Math.floor((b + d) / 2), e, -m(f)).result ? L("impossible to castle over beaten cell") : G(j, "castling", [], [K(b, c, d, e, f), K(7, 0, 5, 0, f)]) : 4 == b && 6 == d && c == e && 7 == c && a.C && Q(h, b, c, 7, 7) ? Analyzer.t(a, m(f)) ? L("impossible to castle under check") : Analyzer.L(a, Math.floor((b + d) / 2), e, -m(f)).result ? L("impossible to castle over beaten cell") : G(j, "castling", [], [K(b, c, d, e, f), K(7, 7, 5, 7, f)]) : 4 == b && 2 == d && c == e && 0 == c && a.v &&
			Q(h, b, c, 0, 0) ? Analyzer.t(a, m(f)) ? L("impossible to castle under check") : Analyzer.L(a, Math.floor((b + d) / 2), e, -m(f)).result ? L("impossible to castle over beaten cell") : G(j, "castling", [], [K(b, c, d, e, f), K(0, 0, 3, 0, f)]) : 4 == b && 2 == d && c == e && 7 == c && a.A && Q(h, b, c, 0, 7) ? Analyzer.t(a, m(f)) ? L("impossible to castle under check") : Analyzer.L(a, Math.floor((b + d) / 2), e, -m(f)).result ? L("impossible to castle over beaten cell") : G(j, "castling", [], [K(b, c, d, e, f), K(0, 7, 3, 7, f)]) : s : 1 >= Math.abs(b - d) && 1 >= Math.abs(c - e) ? O(b, c, d, e, f, g) : s) :
		e = G(k, "Bad move", [], []);
	return e
}

function M(a, b, c, d, e, f, g) {
	if ("p" == f) {
		var h = 1 <= c && 1 == e - c && b == d && l(g) || 1 == c && 3 == e && b == d && l(g) && l(a.position[2][b]);
		if (h) return G(j, "move", [], [K(b, c, d, e, f)]);
		if (h = 1 == Math.abs(b - d) && 1 == e - c && q(g)) return G(j, "kill", [{
			x: d,
			y: e,
			d: g
		}], [K(b, c, d, e, f)]);
		if (a.m && (g = a.m.move[0], h = 1 == Math.abs(b - d) && 1 == e - c && "P" == g.d && 2 == Math.abs(g.G - g.f) && g.o == d && g.f == c)) return G(j, "en passant", [{
			x: d,
			y: e - 1,
			d: a.position[e - 1][d]
		}], [K(b, c, d, e, f)])
	} else {
		if (h = 6 >= c && -1 == e - c && b == d && l(g) || 6 == c && 4 == e && b == d && l(g) && l(a.position[5][b])) return G(j,
			"move", [], [K(b, c, d, e, f)]);
		if (h = 1 == Math.abs(b - d) && 1 == c - e && r(g)) return G(j, "kill", [{
			x: d,
			y: e,
			d: g
		}], [K(b, c, d, e, f)]);
		if (a.m && (g = a.m.move[0], h = 1 == Math.abs(b - d) && -1 == e - c && "p" == g.d && 2 == Math.abs(g.G - g.f) && g.o == d && g.f == c)) return G(j, "en passant", [{
			x: d,
			y: e + 1,
			d: a.position[e + 1][d]
		}], [K(b, c, d, e, f)])
	}
	return s
}

function O(a, b, c, d, e, f) {
	return r(e) && q(f) || q(e) && r(f) ? G(j, "kill", [{
		x: c,
		y: d,
		d: f
	}], [K(a, b, c, d, e)]) : !l(e) && l(f) ? G(j, "move", [], [K(a, b, c, d, e)]) : s
}

function N(a, b, c, d, e, f, g) {
	a = a.position;
	return Math.abs(b - d) != Math.abs(c - e) || !Q(a, b, c, d, e) ? s : O(b, c, d, e, f, g)
}

function P(a, b, c, d, e, f, g) {
	a = a.position;
	return !(b == d || c == e) ? L("Not a line") : !Q(a, b, c, d, e) ? L("There's smth between target and the rook") : O(b, c, d, e, f, g)
}

function Q(a, b, c, d, e) {
	for (var f = 0 < d - b ? 1 : 0 > d - b ? -1 : 0, g = 0 < e - c ? 1 : 0 > e - c ? -1 : 0, h = 0, d = Math.max(Math.abs(b - d), Math.abs(c - e)); h < d - 1; h++)
		if (b += f, c += g, !l(a[c][b])) return k;
	return j
}
jQuery(document).ready(function() {
	function a() {
		var a = jQuery("#positions option:selected").val();
		w(PREDEFINED_GAME_STATES[a].e, t.z[0], t.z[1])
	}
	window.changePlayers = function() {
		switch (jQuery("input[name=humanside]:checked").val()) {
			case "white":
				t.Z(new x, new y);
				break;
			case "black":
				t.Z(new y, new x);
				break;
			case "both":
				t.Z(new x, new x);
				break;
			default:
				console.error("Undef radiogroup value for setting player")
		}
	};
	window.randomizeAI = function() {
		AI.Ha = jQuery("#rnd").prop("checked")
	};
	window.swapSides = function() {
		UI.Ja =
			jQuery("#swapsides").prop("checked");
		UI.W()
	};
	window.launchGame = a;
	window.suggestMove = function() {
		var a = AI.Ka(t.a).move;
		jQuery("#txt").text(a.Da())
	};
	for (var b = jQuery("#positions"), c = 0; c < PREDEFINED_GAME_STATES.length; c++) b.append("<option value='" + c + "'>" + PREDEFINED_GAME_STATES[c].name + "</option>");
	b.change(a)
});

function m(a) {
	if (q(a)) return A;
	if (r(a)) return B;
	throw "Undefined piece color: " + a;
}

function q(a) {
	return "A" <= a && "Z" >= a
}

function r(a) {
	return "a" <= a && "z" >= a
}

function l(a) {
	return !q(a) && !r(a)
}

function p(a, b) {
	return 0 <= a && 7 >= a && 0 <= b && 7 >= b
}
UI = {
	Ma: "rgb(100,100,100)",
	Oa: "rgb(255, 200, 100)",
	Na: "rgb(0, 200, 100)",
	screen: null,
	ta: 0,
	pa: 0,
	F: 0,
	D: 0,
	I: null,
	O: null,
	la: 0,
	ka: 0,
	eb: {
		r: 0,
		b: 1,
		q: 2,
		k: 3,
		n: 4,
		p: 5
	},
	$a: function(a) {
		var b = 0;
		q(a) && (b += UI.ka, a = a.toLowerCase());
		return {
			x: UI.eb[a] * UI.la,
			y: b,
			width: UI.la,
			height: UI.ka
		}
	},
	Ja: k,
	l: k,
	i: 0,
	j: 0,
	delegate: {
		ga: function() {
			throw "UI.delegate.commitMove is not assigned";
		},
		fa: function() {
			throw "UI.delegate.canSelectCell is not assigned";
		}
	},
	va: {
		za: function() {
			throw "UI.dataSource.getPieceForCell is not assigned";
		}
	},
	Aa: function(a) {
		UI.screen =
			jQuery(a);
		UI.O = document.images.pieces;
		a.width = UI.screen.width();
		a.height = UI.screen.height();
		UI.I = a.getContext("2d");
		UI.I.fillRect(0, 0, UI.screen.width(), UI.screen.height());
		UI.ta = UI.screen.width();
		UI.pa = UI.screen.height();
		UI.F = UI.ta / 8;
		UI.D = UI.pa / 8
	},
	Ta: function(a, b, c) {
		l(a) || (a = UI.$a(a), UI.I.drawImage(UI.O, a.x, a.y, a.width, a.height, b * UI.F, c * UI.D, UI.F, UI.D))
	},
	cb: function(a) {
		var b, c;
		if (a.pageX || a.pageY) b = a.pageX, c = a.pageY;
		b -= UI.screen.offset().left;
		c -= UI.screen.offset().top;
		a = UI.Y(Math.floor(b / UI.F));
		c =
			UI.Y(Math.floor(c / UI.D));
		b = [];
		b.push({
			u: UI.j,
			s: UI.i
		});
		if (UI.delegate.fa(c, a) || UI.l) UI.l ? UI.i == a && UI.j == c ? UI.l = k : (UI.l = k, UI.delegate.ga(UI.i, UI.j, a, c)) : (UI.l = j, UI.i = a, UI.j = c, b.push({
			u: UI.j,
			s: UI.i
		})), UI.ba(b)
	},
	hb: function() {
		UI.l = k;
		UI.ba([{
			u: UI.j,
			s: UI.i
		}])
	},
	Ia: function(a, b) {
		if (UI.delegate.fa(b, a) || UI.l) {
			var c = [];
			c.push({
				u: UI.j,
				s: UI.i
			});
			UI.l = j;
			UI.i = a;
			UI.j = b;
			c.push({
				u: UI.j,
				s: UI.i
			});
			UI.ba(c)
		}
	},
	wa: function(a, b) {
		var c = UI.Y(a),
			d = UI.Y(b);
		UI.I.fillStyle = UI.l && UI.j == a && UI.i == b ? UI.Na : 0 == (a + b) % 2 ? UI.Oa : UI.Ma;
		UI.I.fillRect(d *
			UI.F, c * UI.D, UI.F, UI.D);
		UI.Ta(UI.va.za(a, b), d, c)
	},
	W: function() {
		for (var a = 0; 8 > a; a++)
			for (var b = 0; 8 > b; b++) UI.wa(a, b)
	},
	Y: function(a) {
		UI.Ja && (a = 7 - a);
		return a
	},
	ba: function(a) {
		for (var b = 0; b < a.length; b++) UI.wa(a[b].u, a[b].s)
	}
};