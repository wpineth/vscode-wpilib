function make_blocks(imported){
    console.log('imported:', imported);

    if(imported.commands.length > 0){
        Blockly.Blocks['define_command'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField('Command Name:')
                    //TODO: include reserved keywords
                    .appendField(new Blockly.FieldDropdown(imported.commands.map((command) => {
                        return [command, command]
                    })), 'COMMAND_NAME')
                this.appendStatementInput('INIT')
                    .appendField('initialize');
                this.appendStatementInput('EXECUTE')
                    .appendField('execute');
                this.appendStatementInput('END')
                    .appendField('end');
                this.appendStatementInput('IS_FINISHED')
                    .appendField('is finished');
                this.setColour(160);
                this.setTooltip('Defines a command.');
                // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
            }
        };
    }else{
        Blockly.Blocks['define_command'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField('Command Name:')
                    //TODO: include reserved keywords
                    .appendField(new Blockly.FieldTextInput('should_not_be_seen'), 'COMMAND_NAME')
                this.appendStatementInput('INIT')
                    .appendField('initialize');
                this.appendStatementInput('EXECUTE')
                    .appendField('execute');
                this.appendStatementInput('END')
                    .appendField('end');
                this.appendStatementInput('IS_FINISHED')
                    .appendField('is finished');
                this.setColour(160);
                this.setTooltip('Defines a command.');
                // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
            }
        };
    }
    
    Blockly.Python.forBlock['define_command'] = (block, generator) => {
        const command_name = block.getFieldValue('COMMAND_NAME');

        return `class ${command_name}(commands2.CommandBase):\n` +
        `${generator.INDENT}def __init__(self):\n` +
        `${generator.INDENT.repeat(2)}super().__init__()\n` +
        '\n' +
        `${generator.prefixLines(generator.statementToCode(block, 'INIT', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def execute(self):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'EXECUTE', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def end(self, interrupted: bool):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'END', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def isFinished(self):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'IS_FINISHED', 9) || `${generator.INDENT}return False`, generator.INDENT)}`;
    };

    if(imported.files.length > 0){
        Blockly.Blocks['import'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField('Import ')
                    //TODO: include reserved keywords
                    .appendField(new Blockly.FieldDropdown(imported.files.map((file) => {
                        return [file, file]
                    })), 'IMPORT_NAME')
                this.setColour(160);
                this.setTooltip('Imports other files.');
                // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
            }
        };
    }else{
        Blockly.Blocks['import'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField('Import ')
                    //TODO: include reserved keywords
                    .appendField(new Blockly.FieldTextInput('should_not_be_seen'), 'IMPORT_NAME')
                this.setColour(160);
                this.setTooltip('Imports other files.');
                // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
            }
        };
    }
        
    Blockly.Python.forBlock['import'] = (block, generator) => {
        const import_name = block.getFieldValue('IMPORT_NAME');

        return `import ${import_name}`;
    };
}