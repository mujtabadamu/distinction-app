import { Select, Input, Button } from '@flexisaf/flexibull2';
import { CourseCreateRequest } from 'generated/index';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { curriculums } from 'utils/constants';
import { SelectOption } from 'utils/app-types';

//  TYPES
export type CourseGenerationFormBody = CourseCreateRequest & {
  experienceLevel?: string;
  additionalContext?: string;
};

interface GenerateCourseFormProps {
  onSubmit: (formBody: CourseGenerationFormBody) => Promise<void>;
}

//  -----Main Component----
const GenerateCourseForm = (props: GenerateCourseFormProps) => {
  const { onSubmit } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<CourseGenerationFormBody>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmitHandler = (formBody: CourseGenerationFormBody) => {
    setIsLoading(true);
    onSubmit(formBody).finally(() => setIsLoading(false));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-auto border-[2px] mx-auto md:min-w-[680px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="course-name" className="sr-only">
            Enter course name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                disabled={isLoading}
                id="course-name"
                naked
                style={{ width: '100%' }}
                placeholder="Enter course name"
                {...field}
              />
            )}
          />
          <div className="h-px my-2 border-b"></div>
        </div>

        <p className="text-[12px] mb-4">NB: All fields below are optional</p>

        <div className="flex flex-col  md:flex-row   items-center">
          <div className="flex-grow  w-full md:w-[124px]">
            <Controller
              name="courseCode"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  naked
                  id="course-code"
                  placeholder="Course code"
                  {...field}
                />
              )}
            />
          </div>
          <InputDivider />
          <div className="flex-grow  md:w-auto">
            <Controller
              name="curriculum"
              control={control}
              render={({ field }) => (
                <Select
                  type="text"
                  naked
                  id="curriculum"
                  placeholder="Curriculum"
                  options={curriculumOptions}
                  {...field}
                  onChange={(obj: SelectOption) => field.onChange(obj.value)}
                />
              )}
            />
          </div>
          <InputDivider className="mr-4" />
          <div className="flex items-center flex-grow  gap-1 w-full md:w-[124px]">
            <i className="saf-element-plus text-[20px]" />
            <Controller
              name="additionalContext"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  naked
                  id="additional-context"
                  placeholder="Context"
                  {...field}
                />
              )}
            />
          </div>

          <InputDivider />
          <div className="relative flex items-center  w-full md:w-[124px] justify-between md:justify-start">
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <Select
                  naked
                  id="experience-level"
                  placeholder="Level"
                  {...field}
                />
              )}
            />

            <Button
              disabled={isLoading}
              progress={isLoading}
              onClick={handleSubmit(onSubmitHandler)}
              color="black"
              className="ml-2 p-2 w-[34px] h-[34px] rounded-md flex items-center justify-center text-white"
            >
              <i
                className={`${
                  isLoading ? 'saf-spin4 animate-spin' : 'saf-send-2'
                } text-[18px]`}
              />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

// -----Sub components-----
const InputDivider = ({ className }: { className?: string }) => (
  <div className={`w-[1px] mx-2 bg-gray-300 h-5 ${className || ''}`} />
);

// -----Utils-----
const curriculumOptions = [
  ...curriculums,
  { value: 'OTHERS', label: 'OTHERS', description: 'Others' },
];

export default GenerateCourseForm;
