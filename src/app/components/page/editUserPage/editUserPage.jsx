import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";

const EditUserPage = () => {
    const history = useHistory();
    const params = useParams();
    let id = params.userId;
    id = id.split(":").join("");
    const test = JSON.parse(localStorage.users);
    let nameLocal = "";
    let emailLocal = "";
    let professionLocal = "";
    test.forEach((t) => {
        if (t._id === id) {
            nameLocal = t.name;
            emailLocal = t.email;
            professionLocal = t.profession;
        }
    });
    const [data, setData] = useState({
        name: nameLocal,
        email: emailLocal,
        profession: professionLocal,
        sex: "male"
    });
    console.log("data", data);
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);

    const [users, setUsers] = useState();
    const ProfessionTransform = (id) => {
        for (const pro of professions) {
            if (pro.value === id) {
                return { _id: pro.value, name: pro.label };
            }
        }
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        api.users.fetchAll().then((users) => setUsers(users));
    }, []);

    const handleUpdate = () => {
        history.push(`/users/${id}`);
        const newProfession = ProfessionTransform(data.profession);
        users.map((user) => {
            if (user._id === id) {
                user.name = data.name;
                user.email = data.email;
                user.profession = newProfession;
            }
            return user;
        });
        const updateData = users.filter((user) => {
            return user._id === id;
        });
        api.users.update(id, ...updateData);
    };
    localStorage.clear();
    if (users) {
        return (
            <form>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession.name}
                            />{" "}
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                onClick={handleUpdate}
                            >
                                Обновить
                            </button>
                        </div>

                        <div className="mb-4"></div>
                    </div>
                </div>
            </form>
        );
    }
    return "loading";
};

export default EditUserPage;
