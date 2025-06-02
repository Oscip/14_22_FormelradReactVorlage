import { useState } from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: "",
        i: "",
        r: "",
        p: ""
    });

    const calculate = (event) => {
        event.preventDefault();

        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        let newValues = { ...values };

        // Compute missing values based on available data
        if (!isNaN(u) && !isNaN(i)) {
            newValues.r = u / i;
            newValues.p = u * i;
        } else if (!isNaN(p) && !isNaN(r)) {
            newValues.u = Math.sqrt(p * r);
            newValues.i = Math.sqrt(p / r);
        } else if (!isNaN(p) && !isNaN(i)) {
            newValues.u = p / i;
            newValues.r = p / (i * i);
        } else if (!isNaN(u) && !isNaN(r)) {
            newValues.i = u / r;
            newValues.p = (u * u) / r;
        }

        setValues({
            u: newValues.u ?? "",
            i: newValues.i ?? "",
            r: newValues.r ?? "",
            p: newValues.p ?? ""
        });
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form onSubmit={calculate}>
                    <InputField
                        color="black"
                        value={values.u}
                        label="Spannung (U)"
                        handleChange={e => setValues({ ...values, u: e.target.value })}
                    />
                    <InputField
                        color="black"
                        value={values.i}
                        label="Stromstärke (I)"
                        handleChange={e => setValues({ ...values, i: e.target.value })}
                    />
                    <InputField
                        color="black"
                        value={values.r}
                        label="Widerstand (R)"
                        handleChange={e => setValues({ ...values, r: e.target.value })}
                    />
                    <InputField
                        color="black"
                        value={values.p}
                        label="Leistung (P)"
                        handleChange={e => setValues({ ...values, p: e.target.value })}
                    />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
