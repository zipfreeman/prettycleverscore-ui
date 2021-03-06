import React from 'react'

export interface BoxProps {
    onClick?(param: any): void
    checked: boolean
    display?: React.ReactNode
    style?: any
    vertical?: boolean
    renderBlank?: boolean
}

export const BonusBox = (props: Omit<BoxProps, 'onClick'>) => (
    <Box
        onClick={null}
        display={'?'}
        {...props}
        style={{ cursor: 'default', border: 'none', margin: '6px 6px 14px 6px' }}
    />
)

export const Box = (props: BoxProps) => {
    if (props.renderBlank) {
        return (
            <div
                style={{
                    display: props.vertical ? 'block' : 'inline-block',
                    width: '35px',
                    height: '35px',
                    margin: '4px',
                }}
            />
        )
    }

    return (
        <div style={{ display: props.vertical ? 'block' : 'inline-block' }}>
            <div
                onClick={props.onClick}
                data-testid={'box'}
                style={{
                    width: '35px',
                    height: '35px',
                    margin: '4px',
                    textAlign: 'center',
                    fontSize: '1.8em',
                    border: 'solid 2px grey',
                    borderRadius: 5,
                    cursor: 'pointer',
                    overflow: 'hidden',

                    userSelect: 'none',
                    ...props.style,
                }}
            >
                <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    {props.checked ? (
                        <div
                            data-testid='selected'
                            style={{ width: '100%', height: '100%', backgroundColor: '#333' }}
                        >
                            {props.display}
                        </div>
                    ) : (
                        <div data-testid='deselected' style={{ width: '100%', height: '100%' }}>
                            {props.display}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
