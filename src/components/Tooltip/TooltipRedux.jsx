import * as Tooltip from "@radix-ui/react-tooltip"

export default function TooltipRedux({children, text}){

    return(
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    {children}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content 
                        side="top"
                        sideOffset={6}
                        style={{
                            background: "black",
                            color: "white",
                            padding: "6px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        }}>
                            {text}
                        <Tooltip.Arrow
                            width={10}
                            height={5}
                            style={{ fill: "black" }}
                        />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}