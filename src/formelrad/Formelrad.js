import { useState } from "react";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";
import '../css/mvp.css';

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: ""
    });

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form>
                    <InputField
                        color="black"
                        value={values.u}
                        label="Spannung"
                        handleChange={e => setValues(v => ({ ...v, u: e.target.value }))}
                    />
                    <InputField
                        color="black"
                        value={values.i}
                        label="Stromstaerke"
                        handleChange={e => setValues(v => ({ ...v, i: e.target.value }))}
                    />
                    <InputField
                        color="black"
                        value={values.r}
                        label="Widerstand"
                        handleChange={e => setValues(v => ({ ...v, r: e.target.value }))}
                    />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
