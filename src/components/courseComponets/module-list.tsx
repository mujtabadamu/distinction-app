import React, { useEffect, useRef, useState } from 'react';
import { Text, Button } from '@flexisaf/flexibull2';
import { Accordion } from 'components/accordion/accordion';
import {
  capitalizeFirstLetterOFEachWord,
  formatSecondsToHumanReadableString,
} from 'utils/helpers';
import {
  LessonGroupView,
  LessonItemView,
  LessonView,
  SimpleLessonItemView,
} from 'generated/index';
import LessonTypeIcon from 'components/lessonTypeIcon/lessonTypeIcon';
import { LessonType } from 'utils/content-utils';
import { wrapStopPropagation } from 'utils/content-utils';

import HugeiconsDeleteBin from 'assets/icons/hugeicons-delete-02.svg?react';
import HugeiconsPencilEdit from 'assets/icons/hugeicons-pencil-edit-02.svg?react';
import noop from 'lodash/noop';
import Theme, { Colors } from 'utils/theme';
import { renderMathInElement } from 'mathlive';

export type ItemMode = 'preview' | 'edit';

// -----Module List Layout-----

export interface ModuleListLayoutProps {
  lessonGroups: LessonGroupView[];
  mode?: ItemMode;
  renderRightContent?: () => React.ReactNode;
  renderLessonGroup?: (
    group: LessonGroupView,
    index: number
  ) => React.ReactNode | JSX.Element;
}

export const ModuleListLayout: React.FC<ModuleListLayoutProps> = (props) => {
  const moduleListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moduleListRef.current) {
      renderMathInElement(moduleListRef.current);
    }
  }, [props.lessonGroups]);

  return (
    <div ref={moduleListRef}>
      <div className="flex items-center justify-between mb-4">
        <Text bold size="22px">
          Course Content
        </Text>
        {props.renderRightContent && props.renderRightContent()}
      </div>
      <div className="rounded-lg border bg-white">
        {props.renderLessonGroup &&
          props.lessonGroups.map((group, i) =>
            props.renderLessonGroup?.(group, i)
          )}
      </div>
    </div>
  );
};

// -----Lesson Group-----

export interface LessonGroupProps {
  lessonGroup: LessonGroupView;
  studyTime?: number;
  mode?: ItemMode;
  onEdit?: (group: Partial<LessonGroupView>) => void;
  onDelete?: (group: LessonGroupView) => void;
  renderLessons?: (props: LessonView, index: number) => React.ReactNode;
  rightContent?: React.ReactNode;
}

export const LessonGroup: React.FC<LessonGroupProps> = (props) => {
  const shouldRenderLessons =
    props.renderLessons &&
    props.lessonGroup.lessons &&
    props.lessonGroup.lessons.length > 0;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.lessonGroup.name);
  const [loading, setLoading] = useState(false);

  const startEdit = () => {
    setEditedTitle(props.lessonGroup.name);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!props.lessonGroup.id || !props.onEdit) return;
    setLoading(true);
    try {
      await props.onEdit({ name: editedTitle });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(props.lessonGroup.name);
  };

  function renderEditMode() {
    if (props.mode !== 'edit') return null;
    return (
      <>
        {!isEditing ? (
          <>
            {props.onEdit && (
              <Button
                size="small"
                color={Colors.Grey200}
                pale
                fontColor="black"
                onClick={wrapStopPropagation(startEdit)}
                iconLeft={<HugeiconsPencilEdit className="w-4 h-4" />}
                className="ml-2 "
              >
                Edit Title
              </Button>
            )}
            {props.onDelete && (
              <Button
                size="small"
                pale
                color="#FBB1C4"
                fontColor={Theme.PrimaryRed}
                onClick={wrapStopPropagation(() => {
                  props.lessonGroup.id && props.onDelete?.(props.lessonGroup);
                })}
                style={{
                  padding: '8px',
                  backgroundColor: '#fee2e2',
                  borderRadius: '8px',
                }}
                className="ml-2 "
              >
                <HugeiconsDeleteBin className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              size="small"
              color="black"
              fontColor="white"
              onClick={wrapStopPropagation(handleSave)}
              disabled={loading}
              className="ml-2 font-[500]"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="small"
              pale
              onClick={wrapStopPropagation(handleCancel)}
              disabled={loading}
              className="ml-2 font-[500]"
            >
              Cancel
            </Button>
          </>
        )}
      </>
    );
  }

  return (
    <Accordion
      label={(isOpen) => (
        <div
          className={`flex px-[20px] items-center py-4  ${
            isOpen ? 'bg-gray-1001' : 'bg-transparent'
          }`}
        >
          <div className="mr-[20px] text-[20px] text-blue-grey-900 flex-shrink-0">
            {isOpen ? '-' : '+'}
          </div>
          <div className="flex flex-col flex-1 min-w-0 mr-4">
            <Text className="leading-[24px]"> </Text>
            {!isEditing ? (
              <Text bold size="14px" className="leading-[24px] truncate">
                {props.lessonGroup.name}
              </Text>
            ) : (
              <input
                className="border rounded px-2 py-1 text-sm w-full"
                value={editedTitle}
                onClick={wrapStopPropagation(noop)}
                onChange={(e) => setEditedTitle(e.target.value)}
                disabled={loading}
                autoFocus
              />
            )}
          </div>
          <div className="flex-shrink-0 flex text-smaller items-center gap-2 min-w-0">
            {props.rightContent}
          </div>
          {renderEditMode()}
        </div>
      )}
    >
      <div>
        {shouldRenderLessons &&
          props.lessonGroup.lessons?.map((lesson, i) =>
            props.renderLessons?.(lesson, i)
          )}
      </div>
    </Accordion>
  );
};

// -----Lesson-----

export interface LessonProps {
  lesson: LessonView;
  studyTime?: number;
  mode?: ItemMode;
  onEdit?: (lesson: Partial<LessonView>) => void;
  onDelete?: (lesson: LessonView) => void;
  renderLessonItem?: (
    lessonItem: SimpleLessonItemView,
    index: number
  ) => React.ReactNode;
  index?: number;
}

export const Lesson: React.FC<LessonProps> = (props) => {
  const shouldRenderLessonItems =
    props.renderLessonItem &&
    props.lesson.lessonItems &&
    props.lesson.lessonItems.length > 0;
  const sn = props.index != null ? props.index + 1 : '';

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.lesson.title);
  const [loading, setLoading] = useState(false);

  const startEdit = () => {
    setEditedTitle(props.lesson.title);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!props.onEdit) return;
    setLoading(true);
    try {
      await props.onEdit({ title: editedTitle });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(props.lesson.title);
  };

  function renderEditMode() {
    if (props.mode !== 'edit') return null;
    return (
      <>
        {!isEditing ? (
          <>
            {props.onEdit && (
              <Button
                size="small"
                color="white"
                plain
                fontColor={Theme.PrimaryBlue}
                onClick={wrapStopPropagation(startEdit)}
                className="ml-2 font-[500] "
              >
                Edit Title
              </Button>
            )}
            {props.onDelete && (
              <Button
                size="small"
                plain
                color="white"
                fontColor={Theme.PrimaryRed}
                onClick={wrapStopPropagation(() => {
                  props.onDelete?.(props.lesson);
                })}
                className="ml-2 font-[500]"
              >
                Delete Lesosn
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              size="small"
              color="black"
              fontColor="white"
              onClick={wrapStopPropagation(handleSave)}
              disabled={loading}
              className="ml-2 font-[500]"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="small"
              pale
              onClick={wrapStopPropagation(handleCancel)}
              disabled={loading}
              className="ml-2 font-[500]"
            >
              Cancel
            </Button>
          </>
        )}
      </>
    );
  }

  return (
    <Accordion
      label={() => (
        <div className="hover:bg-gray-100 cursor-pointer px-[20px] py-2 flex items-center">
          <div className="w-6 flex-shrink-0"></div>
          <span className="text-black mr-3 flex-shrink-0">{sn}. </span>
          {!isEditing ? (
            <Text className="flex-1 min-w-0 truncate mr-4">
              {props.lesson.title}
            </Text>
          ) : (
            <input
              className="border rounded px-2 py-1 text-sm flex-1 min-w-0 mr-4"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={loading}
              onClick={wrapStopPropagation(noop)}
              autoFocus
            />
          )}
          <Text className="text-smaller flex-shrink-0 min-w-[60px] text-right">
            {props.studyTime && props.studyTime > 0
              ? formatSecondsToHumanReadableString(props.studyTime)
              : '--'}
          </Text>
          {renderEditMode()}
        </div>
      )}
    >
      {shouldRenderLessonItems && (
        <div className="w-full pl-6">
          {props.lesson.lessonItems?.map((item, i) =>
            props.renderLessonItem?.(item, i)
          )}
        </div>
      )}
    </Accordion>
  );
};

// -----Lesson Item-----

export interface LessonItemProps {
  lessonItem: SimpleLessonItemView;
  studyTime?: number;
  mode?: ItemMode;
  onEdit?: (lessonItem: Partial<LessonItemView>) => void;
  onDelete?: (lessonItem: LessonItemView) => void;
  renderLessonItem?: (
    lessonItem: LessonItemView,
    index: number
  ) => React.ReactNode;
  index?: number;
  enableInlineEditing?: boolean;
}

export const LessonItem: React.FC<LessonItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(
    props.lessonItem.title ?? 'Untitled'
  );
  const [loading, setLoading] = useState(false);

  const startEdit = () => {
    if (!props.enableInlineEditing) {
      props.onEdit?.({ title: props.lessonItem.title });
    } else {
      setEditedTitle(props.lessonItem.title ?? 'Untitled');
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!props.onEdit) return;
    setLoading(true);
    try {
      await props.onEdit({ title: editedTitle });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(props.lessonItem.title ?? 'Untitled');
  };

  function renderEditMode() {
    if (props.mode !== 'edit') return null;
    return (
      <>
        {!isEditing ? (
          <>
            {props.onEdit && (
              <Button
                size="small"
                color="white"
                plain
                fontColor={Theme.PrimaryBlue}
                onClick={wrapStopPropagation(startEdit)}
                className="ml-2 font-[500] "
              >
                Edit Item
              </Button>
            )}
            {props.onDelete && (
              <Button
                size="small"
                color="white"
                plain
                fontColor={Theme.PrimaryRed}
                onClick={wrapStopPropagation(() => {
                  props.onDelete?.(props.lessonItem);
                })}
                className="ml-2 font-[500] "
              >
                Delete Item
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              size="small"
              color="black"
              fontColor="white"
              onClick={wrapStopPropagation(handleSave)}
              disabled={loading}
              className="ml-2 font-[500] "
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="small"
              pale
              onClick={wrapStopPropagation(handleCancel)}
              disabled={loading}
              className="ml-2 font-[500]"
            >
              Cancel
            </Button>
          </>
        )}
      </>
    );
  }

  return (
    <div className="hover:bg-gray-100 cursor-pointer px-[20px] py-2 flex items-center">
      <div className="w-6 flex-shrink-0"></div>
      <LessonTypeIcon
        lessonType={props.lessonItem.type as LessonType}
        className="mr-1"
      />
      {!isEditing ? (
        <Text className="flex-1 min-w-0 truncate mr-4">
          {capitalizeFirstLetterOFEachWord(
            props.lessonItem.title ?? 'Untitled'
          )}
        </Text>
      ) : (
        <input
          className="border rounded px-2 py-1 text-sm flex-1 min-w-0 mr-4"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={loading}
          onClick={wrapStopPropagation(noop)}
          autoFocus
        />
      )}
      <Text className="text-smaller flex-shrink-0 min-w-[60px] text-right">
        {props.studyTime && props.studyTime > 0
          ? formatSecondsToHumanReadableString(props.studyTime)
          : '--'}
      </Text>
      {renderEditMode()}
    </div>
  );
};
