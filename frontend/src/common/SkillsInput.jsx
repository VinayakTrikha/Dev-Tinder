// common/SkillsInput.jsx
import { useState } from "react";

const SkillsInput = ({ register, setValue, getValues, errors }) => {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() === "") return;
    const currentSkills = getValues("skills") || [];
    const newSkills = [...currentSkills, skillInput.trim()];
    setValue("skills", newSkills);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    const currentSkills = getValues("skills") || [];
    const newSkills = currentSkills.filter((_, i) => i !== index);
    setValue("skills", newSkills);
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Skills</legend>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="input flex-1"
          placeholder="Type a skill and press Add"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <button type="button" className="btn btn-secondary" onClick={addSkill}>
          Add
        </button>
      </div>

      {/* Show badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        {(getValues("skills") || []).map((skill, idx) => (
          <div key={idx} className="badge badge-primary gap-2">
            {skill}
            <button
              type="button"
              className="btn btn-xs btn-circle"
              onClick={() => removeSkill(idx)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Hidden input so RHF tracks the array */}
      <input
        type="hidden"
        {...register("skills", { required: "At least 1 skill required" })}
      />
      {errors.skills && (
        <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
      )}
    </fieldset>
  );
};

export default SkillsInput;
