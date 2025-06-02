import { useState } from "react";
import "../css/mvp.css";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: "",
        i: "",
        r: "",
        p: "",
        message: ""
    });

    const parse = (val) => val === "" ? NaN : parseFloat(val);

    const handleSubmit = (event) => {
        event.preventDefault();

        const u = parse(values.u);
        const i = parse(values.i);
        const r = parse(values.r);
        const p = parse(values.p);

        const knownCount = [u, i, r, p].filter(val => !isNaN(val)).length;

        if (knownCount !== 2) {
            setValues(prev => ({ ...prev, message: "Bitte genau zwei Felder ausfüllen." }));
            return;
        }

        let newValues = { ...values, message: "" };

        if (!isNaN(p) && !isNaN(r)) {
            newValues.u = Math.sqrt(p * r).toFixed(2);
            newValues.i = Math.sqrt(p / r).toFixed(2);
        } else if (!isNaN(p) && !isNaN(i)) {
            newValues.u = (p / i).toFixed(2);
            newValues.r = (p / (i * i)).toFixed(2);
        } else if (!isNaN(p) && !isNaN(u)) {
            newValues.i = (p / u).toFixed(2);
            newValues.r = (u * u / p).toFixed(2);
        } else if (!isNaN(u) && !isNaN(i)) {
            newValues.r = (u / i).toFixed(2);
            newValues.p = (u * i).toFixed(2);
        } else if (!isNaN(u) && !isNaN(r)) {
            newValues.i = (u / r).toFixed(2);
            newValues.p = (u * u / r).toFixed(2);
        } else if (!isNaN(i) && !isNaN(r)) {
            newValues.u = (i * r).toFixed(2);
            newValues.p = (i * i * r).toFixed(2);
        }

        setValues(newValues);
    };

    const handleClear = (event) => {
        event.preventDefault();
        setValues({ u: "", i: "", r: "", p: "", message: "" });
    };

    return (
        <section>
            <header>
                <h2>Formelrad</h2>
                <img src={formelrad} width="200" alt="Formelrad" />
            </header>
            <form onSubmit={handleSubmit}>
                <InputField color="black" value={values.u} label="Spannung (U)" handleChange={e => setValues({ ...values, u: e.target.value })} />
                <InputField color="black" value={values.i} label="Stromstärke (I)" handleChange={e => setValues({ ...values, i: e.target.value })} />
                <InputField color="black" value={values.r} label="Widerstand (R)" handleChange={e => setValues({ ...values, r: e.target.value })} />
                <InputField color="black" value={values.p} label="Leistung (P)" handleChange={e => setValues({ ...values, p: e.target.value })} />
                <button type="submit">Berechnen</button>
                <button onClick={handleClear} style={{ marginLeft: 10 }}>Zurücksetzen</button>
                {values.message && <p style={{ color: "red" }}>{values.message}</p>}
            </form>
        </section>
    );
}
