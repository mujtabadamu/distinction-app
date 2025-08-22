import { Tabs as FlexiTabs, Text, Button, Box } from '@flexisaf/flexibull2';
import { useState } from 'react';

import { CourseView } from 'generated/index';
import { Colors } from 'utils/theme';
import HugeiconsPencilEdit from 'assets/icons/hugeicons-pencil-edit-02.svg?react';

type TabMode = 'preview' | 'edit';

type TabProps = {
  intro: string;
  learningObjectives: string[];
  certificateUrl?: string;
  mode?: TabMode;
  onSave?: (partialCourse: Partial<CourseView>) => Promise<void>;
};

export const Tabs = (props: TabProps) => {
  return (
    <div>
      <FlexiTabs responsive={false} bgColor="none" style={{ maxWidth: '100%' }}>
        <Box label="Description">
          <IntroductionTab
            intro={props.intro}
            mode={props.mode}
            onSave={props.onSave}
          />
        </Box>
        <Box label="Learning Objectives">
          <LearningObjectivesTab
            learningObjectives={props.learningObjectives}
            mode={props.mode}
            onSave={props.onSave}
          />
        </Box>
        {props.certificateUrl && (
          <Box label="Certificates">
            <CertificateTab
              certificateUrl={props.certificateUrl}
              isOpen={false}
            />
          </Box>
        )}
      </FlexiTabs>
    </div>
  );
};

const IntroductionTab = (p: {
  intro: string;
  mode?: TabMode;
  onSave?: (partialCourse: Partial<CourseView>) => Promise<void>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIntro, setEditedIntro] = useState(p.intro);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!p.onSave) return;
    try {
      setIsSaving(true);
      await p.onSave({ description: editedIntro });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedIntro(p.intro);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={editedIntro}
            onChange={(e) => setEditedIntro(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="Enter course introduction..."
          />
          <div className="mt-2 flex gap-2">
            <Button size="small" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="small"
              pale
              disabled={isSaving}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Description description={p.intro} />
      )}

      {p.mode === 'edit' && !isEditing && (
        <div className="mb-4 mt-10">
          <Button
            pale
            fontColor="black"
            iconLeft={<HugeiconsPencilEdit className="w-4 h-4" />}
            color={Colors.Grey200}
            onClick={() => setIsEditing(true)}
          >
            Edit Introduction
          </Button>
        </div>
      )}
    </div>
  );
};

const LearningObjectivesTab = (p: {
  learningObjectives: string[];
  mode?: TabMode;
  onSave?: (partialCourse: Partial<CourseView>) => Promise<void>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedObjectives, setEditedObjectives] = useState([
    ...p.learningObjectives,
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!p.onSave) return;
    try {
      setIsSaving(true);
      await p.onSave({ learningObjectives: editedObjectives });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedObjectives([...p.learningObjectives]);
    setIsEditing(false);
  };

  const addObjective = () => {
    setEditedObjectives([...editedObjectives, '']);
  };

  const removeObjective = (index: number) => {
    setEditedObjectives(editedObjectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...editedObjectives];
    newObjectives[index] = value;
    setEditedObjectives(newObjectives);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          {editedObjectives.map((objective, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <span>•</span>
              <input
                type="text"
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                className="flex-1 p-1 border rounded"
                placeholder="Enter learning objective..."
              />
              <Button
                size="small"
                color="white"
                fontColor="red"
                onClick={() => removeObjective(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="mt-4 flex gap-2">
            <Button size="small" plain onClick={addObjective}>
              Add Objective
            </Button>
            <Button size="small" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="small"
              pale
              disabled={isSaving}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <ul>
          {p.learningObjectives.map((objective) => (
            <li key={objective} className="flex items-center my-1 gap-2">
              <span>•</span>
              <Description description={objective} />
            </li>
          ))}
        </ul>
      )}

      {p.mode === 'edit' && !isEditing && (
        <div className="mb-4 mt-10">
          <Button
            size="small"
            pale
            fontColor="black"
            color={Colors.Grey200}
            iconLeft={<HugeiconsPencilEdit className="w-4 h-4" />}
            onClick={() => setIsEditing(true)}
          >
            Edit Learning Objectives
          </Button>
        </div>
      )}
    </div>
  );
};

const CertificateTab = (p: { certificateUrl: string; isOpen?: boolean }) => {
  const lockedView = (
    <div>
      <Text block bold className="mb-3">
        Certificate is locked
      </Text>
      <Text block>Certificated would be unlocked once course is completed</Text>
    </div>
  );

  const openView = (
    <div>
      <Text block bold className="mb-3">
        Certificate is open
      </Text>
      <Text block>Congratulations on course completeion 🎈🎈🎈🎈</Text>
    </div>
  );
  return (
    <div>
      <Text block bold className="mb-2">
        {' '}
        Certificate{' '}
      </Text>
      <div className="rounded-md border ">
        {p.isOpen ? openView : lockedView}
      </div>
    </div>
  );
};

const Description = (p: { description: string }) => (
  <p className="text-[14px] m-0 p-0 leading-[24px]">{p.description}</p>
);
