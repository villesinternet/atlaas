{% set cfg = opts['ms_project'] %}
{% set dest = '{0}/project'.format(cfg['current_archive_dir']) %}
{% set fdest = '{0}/project.failed'.format(cfg['current_archive_dir']) %}
{{cfg.name}}-rollback-faileproject-dir:
  cmd.run:
    - name: |
            if [ -d "{{dest}}" ];then
              rsync -Aa --delete "{{cfg.project_root}}/" "{{fdest}}/"
            fi;
    - user: {{cfg.user}}

{{cfg.name}}-rollback-project-dir:
  cmd.run:
    - name: |
            if [ -d "{{dest}}" ];then
              rsync -Aa --delete "{{dest}}/" "{{cfg.project_root}}/"
            fi;
    - user: {{cfg.user}}
    - require:
      - cmd:  {{cfg.name}}-rollback-faileproject-dir

{{cfg.name}}-rolldb:
  cmd.run:
    - name: rsync -Aa "{{dest}}/{{cfg.data.DATABASE_FILE}}" "{{cfg.data.DATABASE_FILE}}"
    - user: root
    - watch:
      - cmd: {{cfg.name}}-rollback-project-dir
