import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box } from './Box'
import { Select, MenuItem } from '@material-ui/core'
import { BONUS } from '../service/bonusConstants'
import { COLOR } from '../constants/colors'
import { BonusIcon } from './BonusIcon'
import { ScoreRowContainer } from './ScoreRowContainer'
import { Bonuses, calculateBonusesForRow } from '../service/bonus'

const initialScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const bonusMap = [
    null,
    null,
    BONUS.ReRoll,
    BONUS.FreeBlue,
    BONUS.PlusOne,
    BONUS.FreeYellow,
    BONUS.Fox,
    BONUS.ReRoll,
    BONUS.FreeGreen,
    BONUS.Orange6,
    BONUS.PlusOne,
]

interface PurpleScoreProps {
    onChange(inputValues: number[], bonuses: Bonuses): void
}

interface DieSelect {
    value: number
    previousValue: number
    onChange(event: ChangeEvent<{ value: number }>)
}

export const DieSelect = ({ value, previousValue, onChange }: DieSelect) => {
    let menuOptions = [1, 2, 3, 4, 5, 6]
    if (previousValue < 6) {
        menuOptions = menuOptions.filter((n) => previousValue < n)
    }

    return (
        <Select id='die-select' value={value} onChange={onChange}>
            <MenuItem value={0}>{''}</MenuItem>

            {menuOptions.map((n) => (
                <MenuItem key={n} value={n}>
                    {n}
                </MenuItem>
            ))}
        </Select>
    )
}

export const PurpleScore = ({ onChange }: PurpleScoreProps) => {
    const [inputState, setInput] = useState<number[]>(initialScore)

    const handleDieChange = ({ target }: React.ChangeEvent<{ value: number }>, index) => {
        const input = [...inputState]

        input[index] = target.value

        setInput(input)
    }

    useEffect(() => {
        onChange(inputState, calculateBonusesForRow(inputState, bonusMap))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputState])

    return (
        <ScoreRowContainer testId='Purple' color={COLOR.purple}>
            {inputState.map((value, index) => {
                return (
                    <div key={index} style={{ display: 'inline-block' }}>
                        <Box
                            checked={false}
                            display={
                                <DieSelect
                                    value={value}
                                    previousValue={inputState[index - 1] || 6}
                                    onChange={(event) => handleDieChange(event, index)}
                                />
                            }
                        />
                        <BonusIcon type={bonusMap[index]} />
                    </div>
                )
            })}
        </ScoreRowContainer>
    )
}
