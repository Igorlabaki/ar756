import { Text } from "@prisma/client";
import React, { useState } from "react";
import ItemTextListComponent from "./itemTextList";
import { ModalComponent } from "@/components/modal";
import { Scrollbars } from "react-custom-scrollbars";
import { ButtonComponent } from "@/components/button";
import { CreateTextFormComponent } from "./createTextForm";
import SelectItemsComponent from "@/components/selectItems";
import useGetTextList from "@/hook/reactQuery/text/useGetTextList";

export default function TextDashboardComponent() {
  const { textList } = useGetTextList();
  const [filterTextList, setFilterTextList] = useState<string>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  function handleIsCreateModalOpen() {
    setIsCreateModalOpen(true);
  }
  function handleIsCreateModalClose() {
    setIsCreateModalOpen(false);
  }

  function getUniqueAreas(textList: Text[]) {
    if (textList) {
      const uniqueAreas: string[] = [];

      for (const obj of textList) {
        if (!uniqueAreas.includes(obj.area)) {
          uniqueAreas?.push(obj.area);
        }
      }
      return uniqueAreas;
    }
    return [];
  }

  return (
    <div className="flex flex-col px-20 py-20 gap-y-10">
      <div className="flex items-center justify-start w-full text-white text-[17px]">
        <ButtonComponent
          title="CRIAR TEXTO"
          className="flex items-center justify-center py-4 gap-x-2 brightness-50 hover:brightness-100 hover:cursor-pointer"
          onClick={handleIsCreateModalOpen}
        />
      </div>
      <SelectItemsComponent
        listOptions={getUniqueAreas(textList)}
        field={filterTextList}
        setType={setFilterTextList}
        title=""
        flexRow
        type={filterTextList}
        handleHidden
      />
      <Scrollbars style={{ width: "100%", height: 800, gap: 20 }}>
        <div className="flex flex-col flex-1 overflow-hidden gap-y-4">
          {textList?.map((item: Text) => {
            if (filterTextList && item.area != filterTextList) {
              return;
            }
            return (
              <ItemTextListComponent
                key={item.id}
                item={item}
                setFilterTextList={setFilterTextList}
              />
            );
          })}
        </div>
      </Scrollbars>
      {isCreateModalOpen && (
        <ModalComponent onClose={handleIsCreateModalClose}>
          <CreateTextFormComponent mode="CREATE" />
        </ModalComponent>
      )}
    </div>
  );
}
