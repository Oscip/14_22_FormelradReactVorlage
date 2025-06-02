import { useState } from "react";
import "../css/mvp.css";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({ u: "", i: "", r: "", p: "", message: "" });
    const [colors, setColors] = useState({ u: "black", i: "black", r: "black", p: "black" });

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

        let newValues = { u, i, r, p };
        let newColors = { u: "black", i: "black", r: "black", p: "black" };

        if (!isNaN(p) && !isNaN(r)) {
            newValues.u = Math.sqrt(p * r);
            newValues.i = Math.sqrt(p / r);
            newColors.u = "red";
            newColors.i = "red";
        } else if (!isNaN(p) && !isNaN(i)) {
            newValues.u = p / i;
            newValues.r = p / (i * i);
            newColors.u = "red";
            newColors.r = "red";
        } else if (!isNaN(p) && !isNaN(u)) {
            newValues.i = p / u;
            newValues.r = (u * u) / p;
            newColors.i = "red";
            newColors.r = "red";
        } else if (!isNaN(u) && !isNaN(i)) {
            newValues.r = u / i;
            newValues.p = u * i;
            newColors.r = "red";
            newColors.p = "red";
        } else if (!isNaN(u) && !isNaN(r)) {
            newValues.i = u / r;
            newValues.p = (u * u) / r;
            newColors.i = "red";
            newColors.p = "red";
        } else if (!isNaN(i) && !isNaN(r)) {
            newValues.u = i * r;
            newValues.p = i * i * r;
            newColors.u = "red";
            newColors.p = "red";
        }

        setValues({
            u: isNaN(newValues.u) ? "" : newValues.u.toFixed(2),
            i: isNaN(newValues.i) ? "" : newValues.i.toFixed(2),
            r: isNaN(newValues.r) ? "" : newValues.r.toFixed(2),
            p: isNaN(newValues.p) ? "" : newValues.p.toFixed(2),
            message: ""
        });

        setColors(newColors);
    };

    const handleClear = () => {
        setValues({ u: "", i: "", r: "", p: "", message: "" });
        setColors({ u: "black", i: "black", r: "black", p: "black" });
    };

    return (
        <section>
            <header>
                <h2>Formelrad</h2>
                <img src={formelrad} width="200" alt="Formelrad" />
            </header>
            <form onSubmit={handleSubmit}>
                <InputField color={colors.u} value={values.u} label="Spannung (U)" handleChange={e => setValues({ ...values, u: e.target.value })} />
                <InputField color={colors.i} value={values.i} label="Stromstärke (I)" handleChange={e => setValues({ ...values, i: e.target.value })} />
                <InputField color={colors.r} value={values.r} label="Widerstand (R)" handleChange={e => setValues({ ...values, r: e.target.value })} />
                <InputField color={colors.p} value={values.p} label="Leistung (P)" handleChange={e => setValues({ ...values, p: e.target.value })} />
                <button type="submit">Berechnen</button>
                <button type="button" onClick={handleClear} style={{ marginLeft: 10 }}>Zurücksetzen</button>
                {values.message && <p style={{ color: "red" }}>{values.message}</p>}
            </form>
        </section>
    );
}
