class Spring{
	constructor(nl = 100, k = 0.025, d = 0.025){
		this.nLength = nl;
		this.stiff = k;
		this.damp = d;
		this.length = nl;

		this.v = 0;
		this.a = 0;
	}

	update(dt = 1){
		this.a = -this.stiff * ( this.length - this.nLength ) - this.damp * this.v;
		this.a *= dt;
		this.v += this.a * dt;
		this.length += this.v * dt;
	}

	pull(dx){
		if( dx > this.nLength )
			dx = this.nLength;
		else if( dx < -this.nLength )
			dx = -this.nLength;

		this.length += dx;
	}

}
